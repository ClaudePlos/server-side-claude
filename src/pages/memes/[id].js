import { useRouter } from  'next/router'
 

export default function Mem({ mem: {name, url} }) {
    //console.log(mem)

    const { back } = useRouter()

    return (
        <>
            <h1>Mem</h1>
            <button onClick={() => back()}>Back</button> 
            <img src={url} alt={`Mem ${name}`}/>
        </>   
    )
}




export async function getServerSideProps(context) {
    const { id } = context.params
    const response = await fetch('https://api.imgflip.com/get_memes')
    const { data, success } = await response.json()
    //console.log('Jestem na backendzie')

    if (!success) {
        return {
            redirect: {
                desination: '/', 
                permament: false, 
            }
        }
    }

    const mem = data.memes.find(mem => mem.id === id)

    return {
        props: {
            mem,
        }
    }
}