"use client"

import { useEffect, useRef } from "react"
import { HiOutlineHome, HiOutlineBriefcase, HiOutlineUser, HiOutlineMail } from "react-icons/hi"

export default function LiquidDiv() {
  const switcherRef = useRef<HTMLFieldSetElement>(null)

  // Switcher logic: detects direction and sets CSS variables
  useEffect(() => {
    const el = switcherRef.current
    if (!el) return

    const radios = el.querySelectorAll('input[type="radio"]')
    let previousValue: string | null = null

    const initiallyChecked = el.querySelector('input[type="radio"]:checked') as HTMLInputElement | null
    if (initiallyChecked) {
      previousValue = initiallyChecked.getAttribute("c-option")
      el.setAttribute('c-previous', previousValue ?? '')
    }

    const handlers: Array<() => void> = []
    radios.forEach(radio => {
      const handler = () => {
        if ((radio as HTMLInputElement).checked) {
          const currentOption = radio.getAttribute("c-option")
          if (previousValue && currentOption) {
            const prev = parseInt(previousValue)
            const curr = parseInt(currentOption)
            el.setAttribute('c-dir', curr > prev ? 'forward' : 'backward')
          }
          el.setAttribute('c-previous', previousValue ?? '')
          previousValue = currentOption
        }
      }
      radio.addEventListener('change', handler)
      handlers.push(() => radio.removeEventListener('change', handler))
    })

    return () => handlers.forEach(cleanup => cleanup())
  }, [])

  return (
    <div className="fixed inset-0 flex items-end justify-center pb-10 pointer-events-none">
      <fieldset className="switcher" ref={switcherRef}>
        <legend className="switcher__legend">Navigation</legend>
        
        <label className="switcher__option" title="Home">
          <input className="switcher__input" type="radio" name="nav" value="home" c-option="1" defaultChecked />
          <HiOutlineHome className="switcher__icon" style={{ color: 'var(--c)' }} strokeWidth={2} />
        </label>

        <label className="switcher__option" title="Projects">
          <input className="switcher__input" type="radio" name="nav" value="projects" c-option="2" />
          <HiOutlineBriefcase className="switcher__icon" style={{ color: 'var(--c)' }} strokeWidth={2} />
        </label>

        <label className="switcher__option" title="About">
          <input className="switcher__input" type="radio" name="nav" value="about" c-option="3" />
          <HiOutlineUser className="switcher__icon" style={{ color: 'var(--c)' }} strokeWidth={2} />
        </label>

        <label className="switcher__option" title="Contacts">
          <input className="switcher__input" type="radio" name="nav" value="contacts" c-option="4" />
          <HiOutlineMail className="switcher__icon" style={{ color: 'var(--c)' }} strokeWidth={2} />
        </label>

        <div className="switcher__filter">
          <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
            <filter id="switcher" primitiveUnits="objectBoundingBox" x="-50%" y="-50%" width="200%" height="200%">
              {/* Higher frequency prevents the 'zoomed in' look and restores fine flow */}
              <feTurbulence 
                type="fractalNoise" 
                baseFrequency="0.015 0.015" 
                numOctaves="12" 
                seed="200" 
                result="noise" 
              />
              <feGaussianBlur in="noise" stdDeviation="0.02" result="softNoise" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.005" result="blurSource"/>
              
              <feDisplacementMap 
                in="blurSource" 
                in2="softNoise" 
                scale="0.2" 
                xChannelSelector="R" 
                yChannelSelector="G" 
              />
            </filter>
          </svg>
        </div>
      </fieldset>
    </div>
  )
}
