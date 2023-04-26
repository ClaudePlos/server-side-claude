import axios from "@/helpers/axios"
import { useRouter } from "next/router"


export default function Hero( {image, name, powerstats} ) {
    const { isFallback } = useRouter()
    const {
        intelligence,
        strenght,
        speed,
        durability,
        power,
        combat,
    } = powerstats;
    const { back } = useRouter()

    if (isFallback) {
        return<p>Data is loading...</p>
    }

    return (
        <>
            <h1><b>Hero {name}</b> <button onClick={back}> |Back|</button></h1>
            <img alt={`Photo of  ${name}`} src={image.url}></img>
            <h3><b>Hero Stats:</b></h3>
            <p>intelligence: {intelligence}</p>
            <p>strenght: {strenght}</p>
            <p>speed: {speed}</p>
            <p>durability: {durability}</p>
            <p>power: {power}</p>
            <p>combat: {combat}</p>
        </>
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

    //console.log(data)

    return {
        props: {
            ...data,
        }  
    }
}