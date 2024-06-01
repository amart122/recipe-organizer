export const preptimeFormatCard = (preptime) => {
  if(isNaN(preptime) || !preptime) return 'N/A'
  return (parseInt(preptime) > 60) ? `${Math.floor(preptime / 60)}h ${preptime % 60}m` : `${preptime}m`
}