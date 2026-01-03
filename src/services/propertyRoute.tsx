import supabase from "../config/supabaseClient";

export async function getPropertyDetails() {
    const { data , error } = await supabase
    .from('property')
    .select()

    if(error) {
        console.log(error)
    }
    console.log(data)
}

export async function uploadImagesToBucket(images , bucketName = "ImageBucket") {
    const uploadedUrls = await Promise.all(
        images.map(async(img,idx)=>{
            const file = img.file;
            const fileName = `${Date.now()}_${idx}_${file.name}`;

            const {data, error: uploadError} = await supabase.storage
            .from(bucketName)
            .upload(fileName,file);

            if(uploadError) throw uploadError;

            const {data: publicData} = supabase.storage
            .from(bucketName)
            .getPublicUrl(fileName)

            return publicData.publicUrl
        })
    )
    return uploadedUrls
} 


export async function addPropertyDetails(details) {
    const { data, error } = await supabase
    .from('property')
    .insert([details])

   return { data, error }
}
