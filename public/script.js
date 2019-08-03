$(function(){
  $('#submit').on('click', function(e){
    e.preventDefault();
    $('#apidata').html('<div id="loader"><img src="img/load.gif" alt="loading..."></div>');

    var input = $('#inputBox').val();
    if (input.startsWith("xrb_") || input.startsWith("nano_")) {
      var requri   = 'api/nano-to-ipfs?wallet='+ input;
      var output = "IPFS"
    } else {
      if (input.startsWith("Qm")) {
        var requri   = 'api/ipfs-to-nano?hash='+ input;
        var output = "NANO"
      } else {
        $('#apidata').html("<h2>Error:</h2><p>Invalid input! Use an IPFS hash (starts with Qm) or a Nano Wallet (starts with nano_ or xrb_)</p><p>Examples:<br>Nano wallet: xrb_1otrtnmqkedtx1998kxzmek3poh5hhjj5frmajsj3gixwmrzcauu8a6osxpm<br>IPFS Hash: QmUDck4dRXma3WAistFedSRv8X5P1GnhTxKdYQCRBrGMRL</p>");
        return
      }
    }

    requestJSON(requri, function(json) {
      if(json.message !== undefined) {
        $('#apidata').html("<h2>Error:</h2><p>" + json.message + "</p>");
      } else {
        var converted = json.successful;
        var outhtml = 'Success:<br><h3>' + converted + '</h3>';
        if (output == "NANO") {
          outhtml = outhtml + '<div class="actionsList"><ul><li><a href="nano:'+converted+'">Open for payment</a></li><li><a href="https://www.nanode.co/account/'+converted+'" target="_blank">Open in BlockExplorer</a></li></ul></div>';
        } else {
          outhtml = outhtml + '<div class="actionsList"><ul><li><a href="https://ipfs.infura.io/ipfs/'+converted+'" target="_blank">Open with infura gateway</a></li><li><a href="https://127.0.0.1:8080/ipfs/'+converted+'" target="_blank">Open with local node:8080</a></li></ul></div>';
        }
        outhtml = outhtml + '<div id="qrcode"></div>';
        $('#apidata').html(outhtml);

          var typeNumber = 6;
          var errorCorrectionLevel = 'L';
          var qr = qrcode(typeNumber, errorCorrectionLevel);
          if (output == "IPFS") {
            qr.addData("https://ipfs.infura.io/ipfs/"+converted);
          } else {
            qr.addData("nano:"+converted);
          }
          qr.make();
          document.getElementById('qrcode').innerHTML = qr.createImgTag();
      } // end else statement
    }); // end requestJSON Ajax call
  }); // end click event handler

  function requestJSON(url, callback) {
    $.ajax({
      url: url,
      complete: function(xhr) {
        callback.call(null, xhr.responseJSON);
      }
    });
  }
});
