import { useRouter } from 'next/router'

const brand = ()=>{
  const router = useRouter();
  const { brandName } = router.query


  return (<p>Brand Name: {brandName}</p>)
}

export default brand;