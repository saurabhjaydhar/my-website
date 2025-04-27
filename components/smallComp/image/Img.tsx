import React from 'react'

interface ImgProps {
  src: string;
  alt: string;
  className?: string;
}

export default function Img({ src, alt, className }: ImgProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} />
  )
}
