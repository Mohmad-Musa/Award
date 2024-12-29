
import { useEffect, useRef,useState } from 'react';
import CustomButton from './CustomButton';
import { TiLocationArrow } from 'react-icons/ti';

import { useWindowScroll } from 'react-use';

import gsap from 'gsap';
const Navbar = () => {
    const navContainerRef = useRef(null);

    const navItem= ['Nexus','Vault','Prologue', 'About', 'Contact'];
     
const [isAudioPlaying, setIsAudioPlaying] = useState(false);

const [isIndicatorActive, setIsIndicatorActive] = useState(false)

const audioElementRef = useRef(null);

     const toggleAudioIndicator = () => {
setIsAudioPlaying((prev)=> !prev);


setIsIndicatorActive((prev)=> !prev);

     }


const {y:currentScrollY} = useWindowScroll();


const [lastScrollY, setLastScrollY] = useState(0)

const [isNavVisable, setIsNavVisable] = useState(true)


useEffect(() => {
if(currentScrollY === 0 ){
    setIsNavVisable(true);
    navContainerRef.current.classList.remove('floating-nav');
}
else if(currentScrollY > lastScrollY){
setIsNavVisable(false);
navContainerRef.current.classList.add('floating-nav');
}
else if (currentScrollY < lastScrollY){
    setIsNavVisable(true);
    navContainerRef.current.classList.add('floating-nav');
}
setLastScrollY(currentScrollY);
}, [currentScrollY,lastScrollY])


useEffect(() => {
gsap.to(navContainerRef.current,{

    y: isNavVisable ? 0 : -100 ,
    opacity: isNavVisable ? 1 : 0,
    duration: 0.2,

})


}, [isNavVisable])

useEffect(() => {   

if(isAudioPlaying){
    audioElementRef.current.play();}
else{
    audioElementRef.current.pause();
}
}, [isAudioPlaying])




  return (
   <div ref={navContainerRef} className='fixed inset-x-0 top-4 h-16 z-50 transition-all
   duration-700 sm:inset-x-6'>
<header className='absolute top-1/2 w-full -translate-y-1/2'
>
<nav className='flex size-full items-center justify-between p-4'>
<div className='flex items-center gap-7'>
<img src="/img/logo.png" alt="logo" className='w-10'/>
<CustomButton id="product-button" title="Product" rightIcon={<TiLocationArrow/>}
containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"/>



</div>

<div className='flex h-full items-center'>
<div className='hidden md:block'>
{navItem.map((item) => (
    
<a key={item}    className='nav-hover-btn' href={`#${item.toLowerCase()}`}>
{item}
</a>

))
}
</div>
<button className='ml-10 flex items-center space-x-0.5' onClick={toggleAudioIndicator}>

<audio ref={audioElementRef}  className="hidden"  src="/audio/loop.mp3"  loop />
{[1,2,3,4].map((bar) => (
    <div key={bar} className={`indicator-line ${isIndicatorActive ? 'active' : ''}`}
    
    style={{
        animationDelay: `${bar * 0.1}s`,
        
    }}/>



)
)}
</button>


</div>
</nav>

</header>

   </div>
  )
}

export default Navbar