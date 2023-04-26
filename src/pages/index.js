import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import axios from '@/helpers/axios'

import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home({heroes, isRequestFaild}) {
  
  if (isRequestFaild) {
    return <p>Ooops something went wrong ....</p>
  }

  const herosElements = heroes.map( hero => <HeroElement key={hero.id} {...hero} />)

  return (
    <main> {/*className="flex min-h-screen flex-col items-center justify-between p-24"*/}
        Menu: <br></br>
        <Link href="/memes">
          <a>Memey ---&#8250;&#8250;&#8250; </a>
        </Link>

        <br></br><br></br>


        <div className={styles.container}>
          <h1 className={styles.header}>HERO ENCYCLOPEDIA</h1>
          <ul className={styles['hero-list']}>
            {herosElements}
          </ul>
        </div>
        




    </main>
  )
}

function HeroElement({id, name, url}) {
  return (
    <li className={styles['hero-list__element']}>
      <Link href={`/hero/${id}`}>
      <a className={styles['hero-list__link']}>
        <img alt={`Photo of ${name}`} className={styles['hero-list__image']} src={url}/>
        <p className={styles['hero-list__name']}>{name}</p>
      </a>
      </Link>
    </li>
  )
}


export async function getStaticProps() {

  const { data, status } = await axios.get('/search/jess')
  //console.log('TEST')
  //console.log(data)

  if (status !== 200) {
    return {
      props: {
        isRequestFaild: true,
      }
    }
  }

  const { results } = data
  const heroes = results.map(({id, name, image: { url }}) => ({id, name, url}))

  return {
    props: {
      heroes,
      isRequestFaild: false,
    }
  }
}
