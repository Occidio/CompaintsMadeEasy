function doSomething() {
    var amount = Math.floor(Math.random()*(500+500+1)-500);
    window.scrollBy({ 
  top: amount, // could be negative value
  left: 0, 
  behavior: 'smooth' 
});
}

(function loop() {
    var rand = Math.round(Math.random() * (3000 - 500)) + 500;
    setTimeout(function() {
            doSomething();
            loop();  
    }, rand);
}());
