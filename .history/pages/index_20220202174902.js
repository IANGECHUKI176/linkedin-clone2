import { signOut, getSession } from "next-auth/react";
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header';
import styles from '../styles/Home.module.css'
import Widgets from '../components/Widgets'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalTypeState,modalState } from "../atom/modalAtom";
import { AnimatePresence } from "framer-motion";
import Modal from "../components/Modal";
import { connectToDatabase } from "../util/mongodb";
export default function Home({posts}) {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/home");
    },
  });

  return (
    <div className='bg-[#f3f2ef] dark:bg-black dark:text-white overflow-y-scroll h-screen md:space-y-6'>
      <Head>
        <title>Feed | LinkedIn</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className='flex justify-center gap-x-6 px-4 sm:px-12'>
        <div className='flex flex-col md:flex-row gap-5'>
          <Sidebar />
          <Feed posts={posts} />
        </div>

        <Widgets />
        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
export async function getServerSideProps(context){
  //chech if user is authenticated on server
  //getSession is serverside properties
  //useSession is client side
  const session=await getSession(context)
  
  if(!session){
    return{
      redirect:{
        permanent:false,
        destination:'/home'
      }
    }
  }
  //get post on SSR
  const { db } = await connectToDatabase()
  const posts=await db.collection('posts').find().sort({timestamp:-1}).toArray()
  //get news from Google news api
  const results = await fetch(
``
  );
  return{
    props:{
      session,
      posts:posts.map((post)=>({
        _id:post._id.toString(), 
        input: post.input,
        photoUrl: post.photoUrl,
        username: post.username,
        email:post.email,
        userImg: post.userImg,
        createdAt: post.createdAt
      }))
    }
  }
}