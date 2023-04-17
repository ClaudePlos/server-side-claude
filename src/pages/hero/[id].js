import axios from "@/helpers/axios"
import { useRouter } from "next/router"


export default function Hero( props ) {
    const { isFallback } = useRouter()
    console.log(props)

    if (isFallback) {
        return<p>Data is loading...</p>
    }

    return (
        <h1>Hello hero</h1>
    )
}


// funkcja do blokowania path url ale fallback musi być na false 
// export async function getStaticPaths() {
//     return {
//         paths: [{params: {id: '1'}}, {params: {id: '2'}}],
//         fallback: true,
//     }
// }


export async function getStaticPaths() {
    const { data } = await axios.get('/search/jess')
    const { results } = data
    const paths = results.map(({id}) => ({params: {id: id.toString()}}))

    return {
        paths,
        fallback: false,
    }
}


export async function getStaticProps({ params }) {

    const { data } = await axios.get(`/${params.id}`)

    return {
        props: {
            ...data,
        }  
    }
}