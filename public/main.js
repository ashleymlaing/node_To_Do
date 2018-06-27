const deleteItems = document.getElementsByClassName("fa-trash");

Array.from(deleteItems).forEach(function(element) {
      element.addEventListener('click', function(){
        console.log('Dro be here')
        const item = this.parentNode.parentNode.childNodes[1].innerText
        fetch('/deleteItem', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'item': item,
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
