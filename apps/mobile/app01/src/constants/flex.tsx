const rowCenterBetween = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
} as const;

const flexRow = {
  display: 'flex',
  flexDirection: 'row',
} as const;

const rowAlignCenterSpaceAround = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-around',
} as const;

const columnCenterCenter = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
} as const;

const rowAlignCenter = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
} as const;

const rowAlignCenterCenter = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'center',
} as const;

const flexColumn = {
  display: 'flex',
  flexDirection: 'column',
} as const;

export const flex = {
  flexRow,
  flexColumn,
  rowAlignCenter,
  rowCenterBetween,
  rowAlignCenterCenter,
  columnCenterCenter,
  rowAlignCenterSpaceAround,
};
