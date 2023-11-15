'use client'
import React from 'react'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Spinner from '@/components/Spinner';
import { useParams } from 'next/navigation';
import styles from './Item.module.css';
import Link from 'next/link';

async function getItem(id: any) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/items/${id}`, {
    next: {
      revalidate: 10,
    },
  })

  return response.json();
}


const ItemPage = () => {
  const [item, setItem] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const routeParams = useParams();
  // let sizes = ['xs', 's', 'm', 'l', 'xl'];
  let [sizes, setSizes] = useState([])
  const compound = ['шерсть - 50%', 'акрил - 50%']
  const [activeSize, setActiveSize] = useState<any>(null);

  useEffect(() => {
    getItem(routeParams.id).then(value => {
      setItem(value);
      setSizes(JSON.parse(value.sizes));
      setActiveSize(JSON.parse(value.sizes)[0])
    }).finally(() => {
      setIsLoading(false)
    });
    console.log(item)
  }, [])


  return (
    <div>
        {
          isLoading ? <Spinner/> : 
          <div>
            <div className="main-section flex justify-center gap-14">
              <div className="left">
                <Image height={500} width={350} src={item.image} alt="item 1" />
              </div>
              <div className="right">
                <h2>{item.label}</h2>
                <div className={styles.priceDiv}>
                  <span className={styles.newPrice}>{item.newPrice} ₽</span>
                  <span className={`${styles.oldPrice} line-through text-neutral-400 mr-2`}>{item.oldPrice} ₽</span>
                </div>
                <div className={styles.sizeDiv}>
                  <div className={styles.sizeHead}>Размер:</div>
                  {sizes && sizes.map((size) => <span onClick={() => {setActiveSize(size)}} key={size} className={`${styles.size} ${size == activeSize ? styles.active : ""}`}>{size}</span>)}
                </div>
                <div>
                  <div className={styles.compoundHead}>Состав:</div>
                  {compound.map((c) => <li key={c} className={styles.compound}>• {c}</li>)}
                </div>
                <div className={`mt-8 py-7 px-5 max-w-lg ${styles.deliveryDiv}`}>
                  <div className='flex'>
                    <div className={styles.iconDelivery}></div>
                    <div>Доставка по городу Екатеринбург <b>бесплатная</b> в течение 1-3 дней</div>
                  </div>
                  <div className='flex'>
                    <div className={styles.iconPackage}></div>
                    <div>Доставка по России компанией CDEK (стоимость доставки рассчитывается отдельно)</div>
                  </div>
                </div>
                <div className='mt-8 text-right'>
                  <Link href="/pay">
                    <button className={styles.buyBtn}>
                      Приобрести
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.extraSection}>
              <div className={styles.descriptionHead}>Описание:</div>
              <div className={styles.description}>
                {item.description}
              </div>
            </div>
          </div>   
          
        }

    </div>
  )
}

export default ItemPage