import ProfilePic from '../assets/image.png'
const Avatar = ({ src, className }: { src: string, className: string }) => {
    const addDefaultImg = (e: any) => e.target.src = ProfilePic
    return (
        <div><img src={src} alt="Profile Pic" onError={addDefaultImg} className={className} /></div>
    )
}

export default Avatar