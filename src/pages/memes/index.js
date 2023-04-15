import Link from 'next/link';

/*Frontend - wykonuje się w przeglądarce */
export default function Memes({ memes }) {

    const listElements = memes.map(mem => (
        <li key={mem.id}>
            <Link href={`/memes/${mem.id}`}>
                <a>{mem.name}</a>
            </Link>
        </li>
    ))

    return (
    <>
        <h1>Memy</h1>
        <ul>
            {listElements}
        </ul>
    </>
    )
}


/*Backend - wykonuje się na serwerze */
export const getServerSideProps = async () => {
    const response = await fetch('https://api.imgflip.com/get_memes')
    const { data, success } = await response.json()

    /* redirect - przekierowanie np. do home */
    if (!success) {
        return {
            redirect: {
                desination: '/', 
                permament: false, 
            }
        }
    }

    const { memes } = data

    return {
        props: {
            memes,
        },
    }
}