import React from "react";
import Container from './container'

export default function Footer() {
  return (
    <footer className="bg-accent-1 border-t border-accent-2 mt-28 mb-24">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl font-bold">
            A statically generated blog example using{' '}
            <a
              href="https://www.gatsbyjs.com/"
              className="underline hover:text-success duration-200 transition-colors"
            >
              Gatsby
            </a>{' '}
            and{' '}
            <a
              href="https://www.drupal.org/"
              className="underline hover:text-success duration-200 transition-colors"
            >
              Drupal
            </a>
            .
          </h3>
        </div>
      </Container>
    </footer>
  )
}
