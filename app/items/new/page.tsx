'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

type Base64 = string;

interface ItemForm {
    label: string;
    description: string;
    oldPrice: number;
    newPrice: number;
    originalLink: string;
    image: Base64;
}

const NewItem = () => {
    const {register, handleSubmit, reset} = useForm<ItemForm>();
    // const router = useRouter();

    // const session = useSession();
    // if (
    //     session?.data?.user?.email === '79527386291kot@gmail.com' ||
    //     session?.data?.user?.name === 'admin'
    // ) {} else {
    //     router.push('/');
    // }

    const [image, setImage] = useState<any>(null)
    const [imageInput, setImageInput] = useState(null)
    const [successToast, setSuccessToast] = useState(false)

    const handleImage = (e: any) => {
        const file = e.target.files[0];
        setImageInput(file);
        const fileReader = new FileReader();
        fileReader.onload = function(e) {
            setImage(e.target?.result)
        }
        fileReader.readAsDataURL(file);
    }

  return (
    <div>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(async (data : any) => {
            data.image = image;
            const resp = await fetch(`${process.env.API_HOST}/items`, {
                method: "POST",
                body: JSON.stringify(data)
            });
            if (resp.status === 201) {
                setSuccessToast(true);
                setTimeout(() => {setSuccessToast(false)}, 3000)
            }
            reset();
            setImage(null);
        })}>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Название товара</label>
                <input type="text" id="label" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/2" placeholder="Белый свитер" required {...register('label')} />
            </div>
            <label className="block text-sm font-medium text-gray-900">Описание товара</label>
            <textarea id="description" rows={4} className="block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/2" placeholder="Вязаный трикотажный свитер" {...register('description')}></textarea>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Старая цена</label>
                <input type="number" id="oldPrice" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/2" placeholder="3900" required {...register('oldPrice', {valueAsNumber: true})} />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">Новая цена</label>
                <input type="number" id="newPrice" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/2" placeholder="2700" required {...register('newPrice', {valueAsNumber: true})} />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Ссылка на оригинальный товар </label>
                <input type="text" id="imgLink" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/2" placeholder="https://www.wildberries.ru/" required {...register('originalLink')} />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Картинка </label>
                <input type="file" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/2" required onChange={handleImage} />
                {image != null ? <Image height={150} width={150} src={image} alt="item 1" className='mt-3' /> : <></>}
            </div>
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded w-28 mt-5">
                Создать
            </button>
            
        </form>

        {successToast ? <div id="toast-top-right" className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                </svg>
                <span className="sr-only">Check icon</span>
            </div>
            <div className="text-sm font-normal">Товар успешно создан.</div>
        </div> : <></>}
    </div>
  )
}

export default NewItem