(function(){
  let clear = document.querySelectorAll('.clear').forEach(function(element){
    element.addEventListener("click", function clear(){
      let input = document.getElementById('outputInput');
      input.value = "";
    });
  });




  let number = document.querySelectorAll('.number').forEach(function(element){
    element.addEventListener("click", function number(){
      let input = document.getElementById('outputInput');
      let numberVal = this.textContent;
      input.value += numberVal;
    });
  });

  let equal = document.querySelectorAll('.equal').forEach(function(element){
    element.addEventListener("click", function equal(){
      let input = document.getElementById('outputInput').value;
      let array = input.split('');
      for (i = 0; i < array.length; i++){
        if(array[i] == "x"){
          array[i] = "*";
        }
      }
      array = array.join("");
      let solution = eval(array);
      document.getElementById('outputInput').value = solution;
    });
  });

})();
