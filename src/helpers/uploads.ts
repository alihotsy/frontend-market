
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getImage = (type:string, image:string | null):string => {


    if(!image) {
        image = "no-image";
    }
 
    const imgUrl = (`${ BASE_URL }/uploads/${ type }/${ image } `);
    return imgUrl;
}