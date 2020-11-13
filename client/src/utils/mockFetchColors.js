import { axiosWithAuth } from './axiosWithAuth'

export const mockFetchColors = () => {
       
    return axiosWithAuth()
        .post('/api/colors')
            .then((res)=>{
                return res
            })
            .catch((err)=> {
            return err
            })
    
}