import { useMemo } from "react";
import memoize from 'fast-memoize';
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useGetImg = () => {

   const { user } = useSelector((state:RootState) => state.auth);
  
 
   /*TODO:Implementar un switch para validar si el tipo es un producto, categoría o usuario */
   const loadImg = useMemo(() => { 

          return memoize((type:string) => {

            const existImg:string = user?.image || 'no-image';

            const imgUrl = (`${ BASE_URL }/uploads/${ type }/${ existImg} `);
            return imgUrl;
          })
       
      
   }, [user?.image])

   return loadImg;
  
}
