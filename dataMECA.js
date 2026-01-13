const materiasPorAnio = {
  primerAnio: ["mb", "ic", "sr1", "if", "fi", "dcc", "ii", "f1", "c1", "sr2", "q", "co1"],
  segundoAnio: ["f2", "alga", "tmt", "co2", "i1", "f3", "c2", "et", "cm"],
  tercerAnio: ["edcn", "eb", "erm", "ss", "lmmee", "i2", "ed", "sm1", "mei", "iei"],
  cuartoAnio: ["est", "mr", "mc", "ti", "sc", "ai", "mem", "se", "r1", "ga"],
  quintoAnio: ["ep", "ia", "sm2", "sanh", "r2", "sorc", "ogi", "hsi", "pim"],
};

const primerCuatri = ["mb", "ic", "sr1", "if", "fi", "dcc", "ii","q"]

const data_a = {
  mb: [],
  ic: [],
  sr1: [],
  if: [],
  fi: [],
  dcc: [],
  ii: [],
  f1: ['if', 'mb'],    // 4, 1
  c1: ['ic'],          // 2
  sr2: ['sr1'],        // 3
  q: [],
  co1: ['fi'],         // 5
  f2: ['f1', 'c1'],    // 8, 9
  alga: ['mb'],        // 1
  tmt: ['f1', 'ic', 'q'], // 8, 2, 11
  co2: ['co1'],        // 12
  i1: ['dcc'],         // 6
  f3: ['f2'],          // 13
  c2: ['c1'],          // 9
  et: ['f2', 'c1'],    // 13, 9
  cm: ['q'],           // 11
  edcn: ['c2'],        // 19
  eb: ['et'],          // 20
  erm: ['f1', 'ic', 'cm'], // 8, 2, 21
  ss: ['c2'],          // 19
  lmmee: ['et'],       // 20
  i2: ['i1'],          // 17
  ed: ['eb'],          // 23
  sm1: ['eb'],         // 23
  mei: ['et'],         // 20
  iei: ['et'],         // 20
  est: ['c1', 'mb'],   // 9, 1
  mr: ['erm', 'edcn'], // 24, 22
  mc: ['ed', 'lmmee', 'co2'], // 28, 26, 16
  ti: ['erm', 'sr2'],  // 24, 10
  sc: ['ed', 'lmmee', 'ss'], // 28, 26, 25
  ai: ['ed'],          // 28
  mem: ['sr2', 'mr'],  // 10, 33
  se: ['mc'],          // 34
  r1: ['sc', 'mr'],    // 36, 33
  ga: ['sm1', 'ii'],   // 29, 7
  ep: ['iei', 'mc'],   // 31, 34
  ia: ['co2', 'edcn', 'est'], // 16, 22, 32
  sm2: ['sc', 'sm1', 'ai'], // 36, 29, 37
  sanh: ['sm1', 'mr'], // 29, 33
  r2: ['r1'],          // 40
  sorc: ['ss', 'se', 'ai'], // 25, 39, 37
  ogi: ['est', 'ti'],  // 32, 35
  hsi: ['mei', 'iei', 'ga'], // 30, 31, 41
  pim: ['mb', 'ic', 'sr1', 'if', 'fi', 'dcc', 'ii', 'f1', 'c1', 'sr2', 'q', 'co1', 'f2', 'alga', 'tmt', 'co2', 'i1', 'f3', 'c2', 'et', 'cm', 'edcn', 'eb', 'erm', 'ss', 'lmmee', 'i2', 'ed', 'sm1', 'mei', 'iei', 'est', 'mr', 'mc', 'ti', 'sc', 'ai', 'mem', 'se', 'r1', 'ga', 'ep', 'ia', 'sm2', 'sanh', 'r2', 'sorc', 'ogi', 'hsi'] // 1 a 45
};

const data_r = {
  mb: [], ic: [], sr1: [], if: [], fi: [], dcc: [], ii: [],
  f1: [], c1: [], sr2: [], q: [], co1: [],
  f2: [], alga: [], tmt: [], co2: [], i1: [], f3: [], c2: [], et: [], cm: [],
  edcn: [], eb: [], erm: [], ss: [], lmmee: [], i2: [], ed: [], sm1: [], mei: [], iei: [],
  est: [], mr: [], mc: [], ti: [], sc: [], ai: [], mem: [], se: [], r1: [], ga: [],
  ep: [], ia: [], sm2: [], sanh: [], r2: [], sorc: [], ogi: [], hsi: [], pim: []
};

const data_cursar_a = {
  mb: [],
  ic: [],
  sr1: [],
  if: [],
  fi: [],
  dcc: [],
  ii: [],
  f1: [],
  c1: [],
  sr2: [],
  q: [],
  co1: [],
  f2: ['if'],          // 4
  alga: ['mb'],        // 1
  tmt: [],             
  co2: ['fi'],         // 5
  i1: ['dcc'],         // 6
  f3: ['f1'],          // 8
  c2: ['ic'],          // 2
  et: ['c1'],          // 9
  cm: ['q'],           // 11
  edcn: ['c1'],        // 9
  eb: [],
  erm: [],
  ss: ['c1'],          // 9
  lmmee: [],
  i2: [],
  ed: ['et'],          // 20
  sm1: [],
  mei: ['f2'],         // 13
  iei: ['f2'],         // 13
  est: ['ic', 'mb'],   // 2, 1
  mr: ['cm'],          // 21
  mc: ['eb', 'co2'],   // 23, 16
  ti: ['erm', 'sr2'],  // 24, 10
  sc: [],
  ai: ['eb'],          // 23
  mem: ['erm', 'sr2'], // 24, 10
  se: ['ed', 'co2'],   // 28, 16
  r1: [],
  ga: ['sm1', 'ii'],   // 29, 7
  ep: ['ed'],          // 28
  ia: ['co2'],         // 16
  sm2: ['ed', 'sm1'],  // 28, 29
  sanh: ['mr', 'et'],  // 33, 20
  r2: [],
  sorc: ['ed', 'ss', 'co2'], // 28, 25, 16
  ogi: ['est'],        // 32
  hsi: ['mei', 'iei'], // 30, 31
  pim: ['mb', 'ic', 'sr1', 'if', 'fi', 'dcc', 'ii', 'f1', 'c1', 'sr2', 'q', 'co1', 'f2', 'alga', 'tmt', 'co2', 'i1', 'f3', 'c2', 'et', 'cm', 'edcn', 'eb', 'erm', 'ss', 'lmmee', 'i2', 'ed', 'sm1', 'mei', 'iei'] // 1 a 31
};

const data_cursar_r = {
  mb: [],
  ic: [],
  sr1: [],
  if: [],
  fi: [],
  dcc: [],
  ii: [],
  f1: ['if', 'mb'],    // 4, 1
  c1: ['ic'],          // 2
  sr2: ['sr1'],        // 3
  q: [],
  co1: ['fi'],         // 5
  f2: ['c1', 'f1'],    // 9, 8
  alga: [],
  tmt: ['q', 'f1', 'ic'], // 11, 8, 2
  co2: ['co1'],        // 12
  i1: [],
  f3: ['f2'],          // 13
  c2: ['c1'],          // 9
  et: ['f2'],          // 13
  cm: [],
  edcn: ['c2'],        // 19
  eb: ['et'],          // 20
  erm: ['cm', 'f1', 'ic'], // 21, 8, 2
  ss: ['c2'],          // 19
  lmmee: ['et'],       // 20
  i2: ['i1'],          // 17
  ed: ['eb'],          // 23
  sm1: ['eb'],         // 23
  mei: ['et'],         // 20
  iei: ['et'],         // 20
  est: ['c1'],         // 9
  mr: ['erm', 'edcn'], // 24, 22
  mc: ['ed', 'lmmee'], // 28, 26
  ti: [],
  sc: ['ed', 'lmmee', 'ss'], // 28, 26, 25
  ai: ['ed'],          // 28
  mem: ['mr'],         // 33
  se: ['mc'],          // 34
  r1: ['sc', 'mr'],    // 36, 33
  ga: [],
  ep: ['mc', 'iei'],   // 34, 31
  ia: ['est', 'edcn'], // 32, 22
  sm2: ['ai', 'sc'],   // 37, 36
  sanh: ['sm1'],       // 29
  r2: ['r1'],          // 40
  sorc: ['se', 'ai'],  // 39, 37
  ogi: ['ti'],         // 35
  hsi: ['ga'],         // 41
  pim: ['est', 'mr', 'mc', 'ti', 'sc', 'ai', 'mem', 'se', 'r1', 'ga'] // 32 a 41
};
