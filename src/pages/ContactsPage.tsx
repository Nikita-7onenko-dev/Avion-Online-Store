import ContactsBlock from "@/Components/ContactsBlock/ContactsBlock";
import ContactsHeroBlock from "@/Components/ContactsHeroBlock/ContactsHeroBlock";
import FeedbackForm from "@/Components/FeedbackForm/FeedbackForm";


import { useEffect, useRef } from "react";


export default function ContactsPage(): React.JSX.Element {

    useEffect(() => {
      window.scrollTo(0,0)
    }, [])

    const scrollRef = useRef(null)

  return (
    <>
      <ContactsHeroBlock ref={scrollRef} />
      <ContactsBlock />
      <FeedbackForm  ref={scrollRef}/>
    </>
  )
}