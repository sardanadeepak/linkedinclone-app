
const Avatar = ({ src, className }: { src: string, className: string }) => {
    return (
        <div><img src={src} alt="Profile Pic" className={className} /></div>
    )
}

export default Avatar