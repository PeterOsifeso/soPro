const totalUniverse = 10000;
let leadToPitch, pitchToProposal, proposalToClose;
let soProAverage, pitch, propose, close;

function generateSoProAverage(prospectUniverse) {
  let average = {
    engaged: {value: null, percent: null},
    opens: {value: null, percent: null},
    responses: {value: null, percent: null},
    leads: {value: null, percent: null}
  };
  average.engaged.value = Math.round((95 / 100) * prospectUniverse);
  average.engaged.percent = Math.round((95 / 100) * 100);
  average.opens.value = Math.round((40 / 100) * average.engaged.value);
  average.opens.percent = Math.round((40 / 100) * average.engaged.percent);
  average.responses.value = Math.round((33 / 100) * average.opens.value);
  average.responses.percent = Math.round((33 / 100) * average.opens.percent);
  average.leads.value = Math.round((37 / 100) * average.responses.value);
  average.leads.percent = Math.round((37 / 100) * average.responses.percent);
  return average;
}
function generateBarInfo(value, previous) {
  let bar = {value: null, percent: null};
  bar.value = Math.round((value / 100) * previous.value);
  bar.percent = Math.round((value / 100) * previous.percent);
  return bar;
}

function generateLeadToClose() {
  pitch = generateBarInfo(leadToPitch, soProAverage.leads);
  $('#pitch-bar').width(pitch.percent + '%');
  $('#pitch-bar-percent').html(pitch.value);

  propose = generateBarInfo(pitchToProposal, pitch);
  $('#propose-bar').width(propose.percent + '%');
  $('#propose-bar-percent').html(propose.value);

  close = generateBarInfo(proposalToClose, propose);
  $('#close-bar').width(close.percent + '%');
  $('#close-bar-percent').html(close.value);
}

$( document ).ready( () => {
  $('.soProAverage').hide();
  $('#pitch-group').hide();
  $('#propose-group').hide();
  $('#close-group').hide();

  $('#prospect-universe').on('keyup', (ev) => {
    let prospectUniverse = Math.round((ev.target.value / 100) * totalUniverse);
    soProAverage = generateSoProAverage(prospectUniverse)
    
    $('#universe-bar').width('100%');
    $('#engaged-bar').width(soProAverage.engaged.percent + '%');
    $('#opens-bar').width(soProAverage.opens.percent + '%');
    $('#responses-bar').width(soProAverage.responses.percent + '%');
    $('#leads-bar').width(soProAverage.leads.percent + '%');

    $('#universe-bar-percent').html(prospectUniverse);
    $('#engaged-bar-percent').html(soProAverage.engaged.value);
    $('#opens-bar-percent').html(soProAverage.opens.value);
    $('#responses-bar-percent').html(soProAverage.responses.value);
    $('#leads-bar-percent').html(soProAverage.leads.value);

    generateLeadToClose();
    $('.soProAverage').show();
    $('#pitch-group').show();
  });

  $('#lead-pitch').on('keyup', (ev) => {
    leadToPitch = ev.target.value;
    generateLeadToClose(leadToPitch);
    $('#propose-group').show();
  });

  $('#pitch-proposal').on('keyup', (ev) => {
    pitchToProposal = ev.target.value;
    generateLeadToClose(pitchToProposal);
    $('#close-group').show();
  });

  $('#proposal-close').on('keyup', (ev) => {
    proposalToClose = ev.target.value;
    generateLeadToClose(proposalToClose);
  });
});
