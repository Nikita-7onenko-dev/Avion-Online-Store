import MainProductCard from "../MainProductCard/MainProductCard"

type Props = {
  quantity?: number
}

export function ProductGridSkeletons({quantity = 4}: Props) {

  const skeletons: React.ReactNode[] = [];

  for(let i = 0; i < quantity; i++) {
    skeletons.push(<MainProductCard key={i} variation='gridElement' />)
  }

  return (
    [...Array(quantity)].map((_, index) => < MainProductCard key={index} variation="gridElement" />)
  )
}