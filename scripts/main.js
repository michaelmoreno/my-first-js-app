function inCheck () {
  let $king = $('.white.king');
  let $kingRank = parseInt($king.parent().parent().attr('class').split('-')[1]);
  let $kingFile = parseInt($king.parent().attr('class').split('-')[1]);
  function checkStraight(u, c, piece) {
    for (let i = u, n = c; Math.abs(i) <= 8; i += u, n += c) {
      let $query = $(`.rank-${$kingRank + i} .file-${$kingFile + n}`)
      if ($query.length < 1) {
        break;
      }
      $query.css('background-color','green');
      if ($query.children().length > 1) {
        if ($query.children().eq(1).attr('class') === `black ${piece}`) {
          check = true;
          $query.css('background-color','blue')
        }
        break;
      }
    }
  }
  // checkStraight(1,1, 'bishop')
  // checkStraight(1,-1, 'bishop')
  // checkStraight(-1,1, 'bishop')
  // checkStraight(-1,-1, 'bishop');
  // checkStraight(0,-1, 'rook');
  // checkStraight(0,1, 'rook');
  // checkStraight(1,0, 'rook');
  // checkStraight(-1,0, 'rook');
  
  function knightCheck() {
    
  }
}
inCheck();

function select() {
  // CURRENT SQUARE
  $('.file').on('click',function(){
    $('.file').off('click'); // put this at top
    let $this = $(this);

    if ($this.children().length > 1) {
      $this.css({
        'z-index': '1',
        transition: 'box-shadow 0.3s ease-in-out', 'box-shadow': '0 0 10px 5px cyan'
      });
      const current = {
        $file: parseInt($this.attr('class').split(' ')[1].split('-')[1]),
        $rank: parseInt($this.parent().attr('class').split(' ')[1].split('-')[1]),
        $piece: $this.children().eq(1),
      }
      let validMoves = [];

      king(current, validMoves);
      pawn(current, validMoves);
      queen(current, validMoves)
      knight(current, validMoves);
      rook(current, validMoves);
      bishop(current, validMoves);
      
      // TARGET SQUARE
      $('.file').one('click',function(){
        let $this = $(this);
        let target = {
          $file: parseInt($this.attr('class').split(' ')[1].split('-')[1]),
          $rank: parseInt($this.parent().attr('class').split(' ')[1].split('-')[1]),
          $piece: $this.children().eq(1),
        }

        for (let i = 0; i < validMoves.length; i++) {
          console.log(`validMoves: ${validMoves[i]}`);
          if (validMoves[i] == `${target.$file},${target.$rank}`) {
            if ($this.children().length > 1) {
              console.log($this.children().eq(1));
              if (target.$piece.attr('class').split(' ')[0] == 'black') {
                stats.white += worth[`${target.$piece.attr('class').split(' ')[1]}`]
                $('.white-score').html(`White: ${stats.white}`)
                target.$piece.appendTo('.black-graveyard');
                current.$piece.appendTo($this);
              }
            }
            current.$piece.appendTo($this);
            break;
          }
        }
        console.log(`target: ${target.$file}, ${target.$rank}`);

        // IF PIECE IS PAWN
        // if (current.$piece.attr('class').split(' ')[1] === 'pawn') {
        //   console.log('pawn selected');
        //   // IF FIRST TURN
        //   if (current.$file == target.$file && current.$rank < target.$rank && (Math.abs(current.$rank - target.$rank) < 2 || (Math.abs(current.$rank - target.$rank) < 3 && current.$rank == 2))) {
        //     console.log('legal move');
        //     if ($this.children().length < 2) {
        //       console.log('target square available');
        //       current.$piece.appendTo($this);
        //     }
        //   }
        //   else if (Math.abs(target.$file - current.$file) == 1 && target.$rank > current.$rank) {
        //     console.log('upper corner square targeted');
        //     if ($this.children().length > 1) {
        //       console.log('target square occupied');
        //       if (target.$piece.attr('class').split(' ')[0] === 'black') {
        //         console.log('enemy occupied ');
        //         target.$piece.appendTo('.black-graveyard');
        //         console.log('captured!');
        //         current.$piece.appendTo($this);
                
        //       }
        //     }
        //   }
        //   // console.log(`file: .${current.$file + 1} rank: .${current.$rank + 1}`);
        //   // else if ($(`.${current.$rank+1} .${current.$file+1}`))
        //   // else {
        //   //   alert('Your pawn cannot move that far!')
        //   // }
        // }
        
        // if ($this.children().length > 1) {
        //   if (target.$piece.attr('class').split(' ')[0] === 'black') {
        //     target.$piece.appendTo('.black-graveyard')
        //     $this.append(current.$piece);
        //     alert ('capture!');
        //   }
        //   else {
        //     alert('Square Occupied!');
        //   }
        // }
        // else {
        //   $this.append(current.$piece);
        // }
        $this.css({ 'border': '5px solid red', 'width': '90px', 'height': '90px'})
        // console.log(current.$file);
        // console.log(current.$rank);
        // console.log(current.$piece);
  
        $('.file').css({'z-index':'0', 'border':'none', 'box-shadow':'none', 'outline':'none', 'height':'100px', 'width':'100px'})
        select();
      });
    }
  })
  inCheck();
}
select();