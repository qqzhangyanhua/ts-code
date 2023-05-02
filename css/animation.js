function moveP8ToP4() {
    const p4 = document.getElementById('p4');
    const p8 = document.getElementById('p8');
    const p4Top = p4.offsetTop;
    const p8Top = p8.offsetTop;
  
    p8.style.top = p4Top - (p8Top - p4Top) + 'px';
  }
  
  function moveP7ToP8() {
    const p7 = document.getElementById('p7');
    const p8 = document.getElementById('p8');
    const p7Top = p7.offsetTop;
    const p8Top = p8.offsetTop;
  
    p7.style.top = p8Top - (p7Top - p8Top) + 'px';
  }
  