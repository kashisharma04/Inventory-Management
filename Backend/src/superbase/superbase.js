// const aws = require('aws-sdk')
// const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY , AWS_REGION } = process.env

// aws.config.update({
//     accessKeyId: AWS_ACCESS_KEY_ID,
//     secretAccessKey: AWS_SECRET_ACCESS_KEY,
//     region: AWS_REGION
// })

// // let uploadFile= async (file) =>{
// //      return new Promise( function(resolve, reject) {
// //     let s3= new aws.S3({apiVersion: '2006-03-01'}); 
// //     var uploadParams= {
// //         ACL: "public-read",
// //         Bucket: "classroom-training-bucket",  
// //         Key: "abc/" + file.originalname,  
// //         Body: file.buffer
// //     }
// //     s3.upload( uploadParams, function (err, data ){
// //         if(err) {
// //             return reject({"error": err})
// //         }
// //         console.log(data)
// //         console.log("file uploaded succesfully")
// //         return resolve(data.Location)
// //     })

// //    })
// // }

// let uploadFile = async (file) => {
//     return new Promise((resolve, reject) => {
//         let s3 = new aws.S3({ apiVersion: '2006-03-01' });
//         var uploadParams = {
//             ACL: "public-read",
//             Bucket: "classroom-training-bucket",
//             Key: "uploads/" + file.originalname,
//             Body: file.buffer
//         };
//         s3.upload(uploadParams, (err, data) => {
//             if (err) {
//                 return reject({ "error": err });
//             }
//             console.log("file uploaded successfully");
//             return resolve(data.Location);
//         });
//     });
// };


// module.exports={uploadFile}




const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const uploadFile = async (file) => {
  const { data, error } = await supabase.storage
    .from('inventory_bucket')
    .upload(`images/${file.originalname}`, file.buffer, {
        cacheControl: '3600',
        upsert: false
      });
  

  if (error) {
    console.error('Error uploading file:', error);
    throw new Error('File upload failed');
  }
  await supabase.storage.from('inventory_bucket').upload('images', file, {
    upsert: true,
  })

  return data.path; // Return the path to the uploaded file
};

module.exports = uploadFile;












