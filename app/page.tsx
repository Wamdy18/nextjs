'use client'
import ItemCard from "@/components/ItemCard";
import Spinner from "@/components/Spinner";
// import items from "@/data/items.json"
import { useEffect, useState } from 'react';

async function getAllItems() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/items`, {
    next: {
      revalidate: 10,
    },
  })

  return response.json();
}
 
export default function Home() {
  const [items, setItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getAllItems().then(setItems).finally(() => setIsLoading(false));
  }, [])

  return (
    <>
    {
      isLoading ? <Spinner/> : 
      <div className="flex flex-wrap gap-y-7">
        {items.map((item) => <ItemCard key={item.id} item={item} />)}
      </div>
    }
    </>
    
  )
}
