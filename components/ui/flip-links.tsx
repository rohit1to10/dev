import React from 'react'

interface FlipLinkProps {
  children: string
  href: string
}

const FlipLink = ({ children, href }: FlipLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group text-white relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl"
      style={{ lineHeight: 0.75 }}
    >
      <div className="flex">
        {children.split('').map((letter, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-[110%]"
            style={{ transitionDelay: `${i * 25}ms` }}
          >
            {letter === ' ' ? ' ' : letter}
          </span>
        ))}
      </div>
      <div className="absolute inset-0 flex">
        {children.split('').map((letter, i) => (
          <span
            key={i}
            className="inline-block translate-y-[110%] transition-transform duration-300 ease-in-out group-hover:translate-y-0 text-zinc-400"
            style={{ transitionDelay: `${i * 25}ms` }}
          >
            {letter === ' ' ? ' ' : letter}
          </span>
        ))}
      </div>
    </a>
  )
}

interface FlipLinksProps {
  links?: { label: string; href: string }[]
}

export const FlipLinks = ({
  links = [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/rohit-kagitha' },
    { label: 'GitHub', href: 'https://github.com/rohitkagitha' },
    { label: 'Email', href: 'mailto:rohitkagitha@gmail.com' },
  ],
}: FlipLinksProps) => {
  return (
    <section className="grid place-content-center gap-4 bg-transparent w-full py-24 px-8">
      {links.map((link) => (
        <FlipLink key={link.label} href={link.href}>
          {link.label}
        </FlipLink>
      ))}
    </section>
  )
}
