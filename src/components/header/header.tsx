import * as React from 'react'

import { linksEntries } from '../../lib/links-map'
import { Container } from '../container'
import { NavDesktop } from '../nav-desktop'
import { NavMobile } from '../nav-mobile'
import { SuddenlyGiovanni } from '../suddenly-giovanni'
import * as headerStyles from './header.module.css'

export const Header: React.VFC<React.ComponentPropsWithoutRef<'nav'>> = ({
  children,
  ...navProps
}) => (
  <header {...navProps} className={headerStyles.header}>
    <Container $maxWidth={720} $noVerticalPadding>
      <nav className={headerStyles.nav}>
        <SuddenlyGiovanni />
        <NavMobile linksEntries={linksEntries} />
        <NavDesktop linksEntries={linksEntries} />
      </nav>
    </Container>
  </header>
)
