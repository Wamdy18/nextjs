import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const ItemCard = ({item} : any) => {
  return (
      <div className='item-card'>
            <Link href={`/items/${item ? item.id : 1}`} className='inline-block mx-2 transition-transform'>
                <Image height={300} width={220} src={item.image} alt="item 1" />
                <div className='mt-2'>{item.label}</div>
                <div className='my-2'>
                    <span className='line-through text-neutral-400 mr-2'>{item.oldPrice} ₽</span>
                    <span>{item.newPrice} ₽</span>
                </div>
            </Link>
        </div>
  )
}

export default ItemCard