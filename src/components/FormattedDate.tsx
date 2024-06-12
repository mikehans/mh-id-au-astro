import React from 'react'

function FormattedDate(props) {
  const {date} = props;

    const dateOptions: DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      };

  return (
    <span>{new Date(date).toLocaleDateString(undefined, dateOptions)}</span>
  )
}

export default FormattedDate