import React from 'react'

import type { Volunteer as IVolunteer } from '../../../typings/resume'

type Props = {
  volunteers: IVolunteer[]
}

export function Volunteer({ volunteers }: Props): JSX.Element {
  return (
    <section>
      <h6>VOLUNTEER</h6>
      {volunteers.map((volunteer) => (
        <pre>{JSON.stringify(volunteer, null, 2)}</pre>
      ))}
    </section>
  )
}
