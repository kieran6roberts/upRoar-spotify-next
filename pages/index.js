import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>
          upRoar
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-full">
        <h1 className="text-xl flex justify-center items-center h-full">
          upRoar - Music App
        </h1>
      </main>
    </div>
  )
}