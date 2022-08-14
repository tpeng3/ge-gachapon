/** All the frog cardes. All frogs are safe in here.

Copy/Paste Frog object:

'NameOfFrog': {
  'name': 'Full Name of Frog'
  'image': 'images/url.png', <- image url, image must be in the images folder
  'description': 'desc',
  'artist': 'name'
},

Note if 'NameOfFrog' has a duplicate, it will go to the last duplicate

 */

var artists = {
  'finch': 'illufinch',
  'matt': 'mattFdraws',
  'slide': 'came2slide',
  'elena': 'ElenaNazaire',
  'frogapples': 'frogapples_',
  'funnyunfunny': 'funnily_unfunny',
  'imaginarymon': 'imaginarymon',
  'instantonion': 'instant_onion',
  'jd': 'jdzombi_',
  'julia': 'juliagoodish',
  'kiana': 'kianamosser',
  'lampy': 'lampysprites',
  'monstrabot': 'monstrabot',
  'pixel': 'pixelgroover',
  'silk': 'silkanide',
  'splishyplash': 'SplishyPlash',
  'windowkitties': 'window_kitties',
  'iyfrr': 'iyfias',
  'kingworrell': 'king_worrell',
  'skullpixl': 'skullpixl',
  'cloudtrumpets': 'cloudtrumpets',
  'ilta': 'iltailtailta',
  'lesma': 'pixe_lesma',
  'mima': 'pixelmima',
  'smug': 'studio_smug',
  'tofu': 'tofupixel'
};

var FROG_CARDS = {
  /* -------------------------- COMMON FROG OBJECT ------------------------ */
  'common': {
    'frogband-trumpet': {
      'name': 'Frog Band',
      'image': 'images/cards/frogband-trumpet.png',
      'description': 'he doot the floot. +40 music, +70 hat',
      'artist': artists.finch,
    },
    'frogband-drums': {
      'name': 'Frog Band',
      'image': 'images/cards/frogband-drums.png',
      'description': 'tapataptap. +40 music +6 drum solos',
      'artist': artists.finch,
    },
    'frogband-sax': {
      'name': 'Frog Band',
      'image': 'images/cards/frogband-sax.png',
      'description': 'ran out of breath fast. +40 music, +2 toot toot',
      'artist': artists.finch,
    },
    'frogtoast': {
      'name': 'Frog Toast',
      'image': 'images/cards/frogtoast.png',
      'description': 'sells well on ebay. + $500',
      'artist': artists.finch,
    },
    'candyfrog': {
      'name': 'Candy Frog',
      'image': 'images/cards/candy.png',
      'description': 'mystery flavor. +1 candy',
      'artist': artists.finch,
    },
    'thecroak': {
      'name': 'The Croak',
      'image': 'images/cards/croak.png',
      'description': 'pog flyin. +20 poggies',
      'artist': artists.slide,
    },
    'accidentfrog': {
      'name': 'Accident Frog',
      'image': 'images/cards/accident.png',
      'description': 'has a surprise for you... +1 wet -1 pants',
      'artist': artists.slide,
    },
    'frogchef': {
      'name': 'Frog Chef',
      'image': 'images/cards/chef.png',
      'description': 'anything except frog legs. +1 croissant -1 cannibalsim',
      'artist': artists.slide,
    },
    'sadfrog': {
      'name': 'Sad Frog',
      'image': 'images/cards/sadfrog.png',
      'description': 'lonely and sad. +10 im fine.',
      'artist': artists.slide,
    },
    'wavefrog': {
      'name': 'Wave Frog',
      'image': 'images/cards/wavefrog.png',
      'description': 'he\'s wavin... but at what cost? +20 good guy +5 nice',
      'artist': artists.slide,
    },
    'longfrog': {
      'name': 'Frooooog',
      'image': 'images/cards/longfrog.png',
      'description': 'long frog. +3 length',
      'artist': artists.frogapples,
    },
    'homelessfrog': {
      'name': 'Homeless Frog',
      'image': 'images/cards/homeless.png',
      'description': 'home is where the frog is. -1 home',
      'artist': artists.frogapples,
    },
    'frogprince': {
      'name': 'Frog Prince',
      'image': 'images/cards/frogprince.png',
      'description': 'a little sleepy. +1 crown +3 hour nap',
      'artist': artists.finch,
    },
    'frogbrella': {
      'name': 'Frogbrella',
      'image': 'images/cards/frogbrella.png',
      'description': 'mystically enchanted to be water proof. +1 enchantment +0 water',
      'artist': artists.finch,
    },
    'skater': {
      'name': 'Sk8r Frog',
      'image': 'images/cards/skater.png',
      'description': 'sick flip bro! +1 flip +3 woha +7 rad',
      'artist': artists.finch,
    },
    'slime': {
      'name': 'Slime Frog',
      'image': 'images/cards/slime.png',
      'description': 'jiggle physics. +3 jiggle +3 wiggle',
      'artist': artists.finch,
    },
    'jam': {
      'name': 'Jam Frog',
      'image': 'images/cards/jamfrog.png',
      'description': 'sticky and sweet. +2 sticky +1 strawberry flavoring',
      'artist': artists.jd,
    },
    'bigbro': {
      'name': 'Big Bro',
      'image': 'images/cards/bigbro.png',
      'description': 'he protec. +1 sibling +1 bully',
      'artist': artists.julia,
    },
    'frogbread': {
      'name': 'Frog Bread',
      'image': 'images/cards/frogbread.png',
      'description': 'delicious carbs. +50 carbs +10 tasty',
      'artist': artists.julia,
    },
    'snacktime': {
      'name': 'Snack Time',
      'image': 'images/cards/snacktime.png',
      'description': 'mmlemm. +1 snack +20 tummy',
      'artist': artists.julia,
    },
    'damedane': {
      'name': 'Dame Da Ne ',
      'image': 'images/cards/damedane.png',
      'description': 'baka mitai. +1 sake +3 yakuza',
      'artist': artists.julia,
    },
    'frogelors': {
      'name': 'Frogelors',
      'image': 'images/cards/frogelors.png',
      'description': 'looking for love. +3 hunks +5 romance',
      'artist': artists.julia,
    },
    'thetads': {
      'name': 'The Tads',
      'image': 'images/cards/tads.png',
      'description': 'not yet frogs. mixed feelings. +2 legs +8 bored',
      'artist': artists.julia,
    },
    'foureyed': {
      'name': '4 Eyed Frog',
      'image': 'images/cards/foureyed.png',
      'description': 'sparkle +1.5 dioptres',
      'artist': artists.lampy,
    },
    'frogsco': {
      'name': 'Frogsco',
      'image': 'images/cards/frogsco.png',
      'description': 'please come again. +1 frog (store brand) +5 reward pts',
      'artist': artists.lampy,
    },
    'ussribbit': {
      'name': 'U.S.S. Ribbit',
      'image': 'images/cards/ussribbit.png',
      'description': 'splash splash +5 splash +5 splash +5 splash',
      'artist': artists.lampy,
    },
    'cupcake': {
      'name': 'Cupcake Frog',
      'image': 'images/cards/cupcake.png',
      'description': 'a tasty treat! +10 sprinkles +1 frosting',
      'artist': artists.matt,
    },
    'soldier': {
      'name': 'Frog Solider',
      'image': 'images/cards/soldier.png',
      'description': 'loyal soldier. +10 range +10 loyalty',
      'artist': artists.matt,
    },
    'bigleaf': {
      'name': 'Big Leaf Frog',
      'image': 'images/cards/bigleaf.png',
      'description': 'big leaf for catching rain. +1 oooh!!',
      'artist': artists.silk,
    },
    'cupofrog': {
      'name': 'Cup o\' Frog',
      'image': 'images/cards/cupofrog.png',
      'description': 'do not drink!! for decoration only. +10 wake up juice',
      'artist': artists.silk,
    },
    'f800': {
      'name': 'F-800',
      'image': 'images/cards/f800.png',
      'description': 'retro, old, but not obsolete. +10 help',
      'artist': artists.silk,
    },
    'f1000': {
      'name': 'F-1000',
      'image': 'images/cards/f1000.png',
      'description': 'brand new, descendent of the F-800. +10 help +10 efficiency',
      'artist': artists.silk,
    },
    'plush': {
      'name': 'Frog Plush',
      'image': 'images/cards/plush.png',
      'description': 'for frog lovers of all ages. +10 softness +50 :)',
      'artist': artists.silk,
    },
    'lover': {
      'name': 'Froggy Lover',
      'image': 'images/cards/lover.png',
      'description': 'ah, l\'amour ... +10 romance',
      'artist': artists.silk,
    },
    'waiter': {
      'name': 'Froggy Waiter',
      'image': 'images/cards/waiter.png',
      'description': 'he work hard!! +1 creamy lobster',
      'artist': artists.silk,
    },
    'froggyhat': {
      'name': 'Froggyhat',
      'image': 'images/cards/froggyhat.png',
      'description': 'classic, timeless. +1 walk walk fashion baby',
      'artist': artists.silk,
    },
    'cursedtape': {
      'name': 'Cursed Frog Tape',
      'image': 'images/cards/cursedfrogtape.png',
      'description': '7 days until you croak. -7 days of life',
      'artist': artists.windowkitties,
    },
    'fairyfroggy': {
      'name': 'Fairy Froggy',
      'image': 'images/cards/fairyfroggy.png',
      'description': 'sparkle sparkle! +10 sparkle',
      'artist': artists.silk,
    },
    'flowerfroggy': {
      'name': 'Flower Froggy',
      'image': 'images/cards/flowerfroggy.png',
      'description': 'time for a nap. +1 tulip +10 zzz',
      'artist': artists.silk,
    },
    'frodango': {
      'name': 'Frodango',
      'image': 'images/cards/frodango.png',
      'description': 'hm!! +3 dumplings',
      'artist': artists.silk,
    },
    'froggybell': {
      'name': 'Froggy Bell',
      'image': 'images/cards/froggybell.png',
      'description': 'ring for good luck! +1 shiny bell',
      'artist': artists.silk,
    },
    'froggyramen': {
      'name': 'Froggy Ramen',
      'image': 'images/cards/froggyramen.png',
      'description': 'inner peace... +1 delicious ramen',
      'artist': artists.silk,
    },
    'icefroggy': {
      'name': 'Ice Froggy',
      'image': 'images/cards/icefroggy.png',
      'description': 'for hot summer days! +1 ice cream puddle',
      'artist': artists.silk,
    },
    'garbagefrog': {
      'name': 'Garbage Frog',
      'image': 'images/cards/garbagefrog.png',
      'description': 'stinky! +3 flies +10 smell',
      'artist': artists.skullpixl,
    },
    'willofrog': {
      'name': 'Will O\' The Frog',
      'image': 'images/cards/willofrog.png',
      'description': 'often seen in swamps at night. +1 wisp',
      'artist': artists.silk,
    },
    'flarefrog': {
      'name': 'Flare Frog',
      'image': 'images/cards/flarefrog.png',
      'description': 'he approaches -100 intimidation',
      'artist': artists.kingworrell,
    },
    'frogception': {
      'name': 'Frogception',
      'image': 'images/cards/frogception.png',
      'description': 'we need to go deeper +10 further +5 beyond',
      'artist': artists.kingworrell,
    },
    'gothgffrog': {
      'name': 'Goth GF Frog',
      'image': 'images/cards/gothgf.png',
      'description': 'secretly collects stickers +10 rad +1 soft center',
      'artist': artists.julia
    },
    'bento': {
      'name': 'Bento',
      'image': 'images/cards/bento.png',
      'description': 'very nutritious +3 rice ball',
      'artist': artists.cloudtrumpets
    },
    'chicken': {
      'name': 'Chicken?',
      'image': 'images/cards/chicken.png',
      'description': 'croak- i mean... cluck... cluck? +1 egg?',
      'artist': artists.cloudtrumpets
    },
    'croak': {
      'name': 'Croak',
      'image': 'images/cards/croakclock.png',
      'description': 'time to hop out of bed! +5 awake',
      'artist': artists.cloudtrumpets
    },
    'frogthug': {
      'name': 'Frog Thug',
      'image': 'images/cards/frogthug.png',
      'description': 'whatcha lookin\' at, punk? +20 menace +4 soda +4 littering',
      'artist': artists.cloudtrumpets
    },
    'frogtaku': {
      'name': 'Frogtaku',
      'image': 'images/cards/frogtaku.png',
      'description': 'w-wanna trade frogpon cards with me? +1 card -1 card',
      'artist': artists.cloudtrumpets
    },
    'froguette': {
      'name': 'Froguette',
      'image': 'images/cards/froguette.png',
      'description': 'oui oui c\'est une baguette! +100 le gluten',
      'artist': artists.cloudtrumpets
    },
    'sleepyfrog': {
      'name': 'Sleepy Frog',
      'image': 'images/cards/sleepyfrog.png',
      'description': 'snore...mimimi...snore...mimimi... +24 zzz',
      'artist': artists.cloudtrumpets
    },
    'tardytoad': {
      'name': 'Tardy Toad',
      'image': 'images/cards/tardytoad.png',
      'description': 'ah. it must be the first episode +1 clumsy +1 toast',
      'artist': artists.cloudtrumpets
    },
    'doodlefrog': {
      'name': 'Doodle Frog',
      'image': 'images/cards/doodlefrog.png',
      'description': 'it\'s just a drawing +1 me +1 hoy +1 minoy',
      'artist': artists.frogapples
    },
    'frogapples': {
      'name': 'Doodle Frog',
      'image': 'images/cards/frogapples.png',
      'description': 'definitely not a self insert +1 frog +1 apples',
      'artist': artists.frogapples
    },
    'patapol': {
      'name': 'Patapol',
      'image': 'images/cards/patapol.png',
      'description': 'pon pon pata +1 pata',
      'artist': artists.frogapples
    },
    'bongofrog': {
      'name': 'Bongofrog',
      'image': 'images/cards/bongofrog.png',
      'description': 'smack smack -8 musicality +2 frog',
      'artist': artists.iyfrr
    },
    'bbfrog': {
      'name': 'BB',
      'image': 'images/cards/bbfrog.png',
      'description': 'perfect +100 happy +100 cute',
      'artist': artists.julia
    },
    'bookfrog': {
      'name': 'Book Frog',
      'image': 'images/cards/bookfrog.png',
      'description': 'eats the book after +10 smarty +1 book',
      'artist': artists.julia
    },
    'cathatfrog': {
      'name': 'Cat Hat Frog',
      'image': 'images/cards/cathatfrog.png',
      'description': 'on the verge of tears +10 :\'(  +1 hat',
      'artist': artists.julia
    },
    'cloudfrog': {
      'name': 'Cloud Frog',
      'image': 'images/cards/cloudfrog.png',
      'description': 'absolutely a bad omen +10 cool -90 luck',
      'artist': artists.julia
    },
    'cosplayfrog': {
      'name': 'Cosplay Frog',
      'image': 'images/cards/cosplayfrog.png',
      'description': 'it\'s his first try +10 photogenic +2 cool guy',
      'artist': artists.julia
    },
    'frobee': {
      'name': 'Fro-bee',
      'image': 'images/cards/frobee.png',
      'description': 'baby\'s first halloween +20 cutie +10 buzz',
      'artist': artists.julia
    },
    'frogpunchers': {
      'name': 'Frog Punchers',
      'image': 'images/cards/frogpunchers.png',
      'description': 'do not punch frogs with +15 +10 -20 int',
      'artist': artists.julia
    },
    'frogessence': {
      'name': 'Frogessence',
      'image': 'images/cards/frogessence.png',
      'description': 'like the t-virus +5 science +1 apocalypse',
      'artist': artists.julia
    },
    'froney': {
      'name': 'Froney',
      'image': 'images/cards/froney.png',
      'description': 'probably poison +10 honeypot +10 yummy',
      'artist': artists.julia
    },
    'mysticalwand': {
      'name': 'Mystical Wand',
      'image': 'images/cards/mysticalwand.png',
      'description': 'perfect for blessing or hitting +20 mnd +50 str',
      'artist': artists.julia
    },
    'rippedfrog': {
      'name': 'Ripped Frog',
      'image': 'images/cards/rippedfrog.png',
      'description': 'will cheer you on +10 support +1 bro',
      'artist': artists.julia
    },
    'snacklad': {
      'name': 'Snack Lad',
      'image': 'images/cards/snacklad.png',
      'description': 'peak happiness +5 chip +10 snack',
      'artist': artists.julia
    },
    'bakefrog': {
      'name': 'Bake Frog',
      'image': 'images/cards/bakefrog.png',
      'description': 'fresh from the oven +1 bread -1 bread',
      'artist': artists.lampy
    },
    'croakaloid': {
      'name': 'Croakaloid',
      'image': 'images/cards/croakaloid.png',
      'description': 'lessoooo +99 music +99 popular',
      'artist': artists.lampy
    },
    'frogconcentrate': {
      'name': 'Frog Concentrate',
      'image': 'images/cards/frogconcentrate.png',
      'description': 'handle with care +1 chug =+1 frog',
      'artist': artists.lampy
    },
    'hidefrog': {
      'name': 'Hide Frog',
      'image': 'images/cards/hidefrog.png',
      'description': 'no one expected that +5 sneaky +1 surprise',
      'artist': artists.lampy
    },
    'touchfrog': {
      'name': 'Touch Frog',
      'image': 'images/cards/touchfrog.png',
      'description': 'hello +99 friendship',
      'artist': artists.lampy
    },
    'waitressfrog': {
      'name': 'Waitress Frog',
      'image': 'images/cards/waitressfrog.png',
      'description': 'i can do it +1 help +6 accidents',
      'artist': artists.lampy
    },
    'warmfrog': {
      'name': 'Warm Frog',
      'image': 'images/cards/warmfrog.png',
      'description': 'seasonal variety -1 cold +1 soft',
      'artist': artists.lampy
    },
    'frompkinpie': {
      'name': 'Frompkin Pie',
      'image': 'images/cards/frompkinpie.png',
      'description': 'carve carefully... +2 pumpkin seeds +1 friend',
      'artist': artists.lesma
    },
    'frogmail': {
      'name': 'Frog Mail',
      'image': 'images/cards/frogmail.png',
      'description': 'less slimey than snail mail  +3 speed -1 slime',
      'artist': artists.mima
    },
    'toadst': {
      'name': 'Toadst',
      'image': 'images/cards/toadst.png',
      'description': 'sshhhh! +99 sleep +13 egg',
      'artist': artists.mima
    },
    'froggybeans': {
      'name': 'Froggy Beans',
      'image': 'images/cards/froggybeans.png',
      'description': 'almost too cute to eat! +10 joy +2 cavities',
      'artist': artists.splishyplash
    },
    'frogghost': {
      'name': 'Frog Ghost',
      'image': 'images/cards/frogghost.png',
      'description': 'd-did you hear that? +3 OoOOoOooO +1 pair of clean pants',
      'artist': artists.splishyplash
    },
    'ufo': {
      'name': 'U.F.O',
      'image': 'images/cards/ufo.png',
      'description': 'unidentified froggy object +100 conspiracies -20 cows',
      'artist': artists.splishyplash
    },
    'frorb': {
      'name': 'Frorb',
      'image': 'images/cards/frorb.png',
      'description': 'throw him. +10 bounce +5 range',
      'artist': artists.smug
    },
    'animalcrossingfrog': {
      'name': 'Animal Crossing Frog',
      'image': 'images/cards/animalcrossingfrog.png',
      'description': 'your new neighbour +5 bells -1 freetime',
      'artist': artists.tofu
    },
    'zombiefrog': {
      'name': 'Zombie Frog',
      'image': 'images/cards/zombiefrog.png',
      'description': 'new frog just dropped +1 discovery',
      'artist': artists.tofu
    },
    'movingfrog': {
      'name': 'Moving Frog',
      'image': 'images/cards/movingfrog.png',
      'description': 'he\'s moving to a new pond +10 sress -500 money',
      'artist': artists.windowkitties
    }

  },

  /* -------------------------- RARE FROG OBJECT ------------------------ */
  'uncommon': {
    'capyfam': {
      'name': 'Capy Family',
      'image': 'images/cards/capyfamily.png',
      'description': 'as advertised. +4 frog, +1 capybara',
      'artist': artists.finch,
    },
    'chomper': {
      'name': 'Chomper',
      'image': 'images/cards/chomper.png',
      'description': 'he never stops. +20 horror, +50 suffering',
      'artist': artists.slide,
    },
    'sleepingfrog': {
      'name': 'Sleeping Frog',
      'image': 'images/cards/sleepingfrog.png',
      'description': 'just kiss her. +50 nobility +12 caprice +10 sleep',
      'artist': artists.elena,
    },
    'froggod': {
      'name': 'Frog God',
      'image': 'images/cards/froggod.png',
      'description': 'big ol space hug. +30 luve, +5 space tech',
      'artist': artists.funnyunfunny,
    },
    'alienfrog': {
      'name': 'Alien Frog',
      'image': 'images/cards/alienfrog.png',
      'description': 'he costs $15.72 at home depot. +15.72 unholy energy',
      'artist': artists.finch,
    },
    'frogdoll': {
      'name': 'Frog Doll',
      'image': 'images/cards/frogdoll.png',
      'description': 'press it for a random phrase. +5 accurately predicts deaths +2 *squeak*',
      'artist': artists.finch,
    },
    'luckyfrog': {
      'name': 'Lucky Frog',
      'image': 'images/cards/luckyfrog.png',
      'description': 'brings fortune and slime. +$50 +32 slimes',
      'artist': artists.finch,
    },
    'bardbaby': {
      'name': 'Bard Baby',
      'image': 'images/cards/bardbaby.png',
      'description': 'only knows twinkle twinkle. +10 harmony +6 happy',
      'artist': artists.julia,
    },
    'cutiepie': {
      'name': 'Cutie Pie',
      'image': 'images/cards/cutiepie.png',
      'description': 'AKA sweetie pie. +10 sugar +8 berry',
      'artist': artists.julia,
    },
    'frattle': {
      'name': 'Frattle',
      'image': 'images/cards/frattle.png',
      'description': 'fun for all ages. +5 shake +3 joy',
      'artist': artists.julia,
    },
    'magical': {
      'name': 'Magical Frog',
      'image': 'images/cards/magicalfrog.png',
      'description': 'shooting star swish! +100 magic +100 sparkles',
      'artist': artists.julia,
    },
    'apprentice': {
      'name': 'Frog Apprentice',
      'image': 'images/cards/apprentice.png',
      'description': '"musca mandatum!" +2 flies -10 mana',
      'artist': artists.kiana,
    },
    'cherub': {
      'name': 'Kerub',
      'image': 'images/cards/cherub.png',
      'description': 'croak, mortal. +1 blessing',
      'artist': artists.lampy,
    },
    'noodles': {
      'name': 'Noodles',
      'image': 'images/cards/noodles.png',
      'description': 'delicious. +9 slurp +99 nutrition',
      'artist': artists.lampy,
    },
    'frogtech': {
      'name': 'Frog Tech',
      'image': 'images/cards/frogtech.png',
      'description': 'the latest in frogchip technology. +25 intelligence +10 hardware',
      'artist': artists.matt,
    },
    'frogpocalypse': {
      'name': 'Frogpocalypse',
      'image': 'images/cards/frogpocalypse.png',
      'description': 'frog dad. +5 joy +5 doom',
      'artist': artists.monstrabot,
    },
    'crossover': {
      'name': 'Froggy Crossover',
      'image': 'images/cards/crossover.png',
      'description': 'an unlikely friendship. +1 friend',
      'artist': artists.silk,
    },
    'retro': {
      'name': 'Retro Froggy',
      'image': 'images/cards/retro.png',
      'description': 'video game go beep boop. +1 beep +1 boop',
      'artist': artists.silk,
    },
    'business': {
      'name': 'Business Frog',
      'image': 'images/cards/business.png',
      'description': 'his briefcase is full of swamp water. +1 moustache',
      'artist': artists.splishyplash,
    },
    'idol': {
      'name': 'Frog Idol',
      'image': 'images/cards/idol.png',
      'description': 'worth at least like $3. +like $3 +50 curses',
      'artist': artists.splishyplash,
    },
    'mirror': {
      'name': 'Froggy Mirror',
      'image': 'images/cards/mirror.png',
      'description': 'the reflection is always a frog. +2 beauty +7 charm',
      'artist': artists.splishyplash,
    },
    'froglodyte': {
      'name': 'Froglodyte',
      'image': 'images/cards/froglodyte.png',
      'description': 'a prehistoric pal. +1 club -5 hygiene',
      'artist': artists.splishyplash,
    },
    'cookie': {
      'name': 'Frog Cookie',
      'image': 'images/cards/cookie.png',
      'description': 'chomp!! +50 sugar rush',
      'artist': artists.windowkitties,
    },
    'gorf': {
      'name': 'Gorf',
      'image': 'images/cards/gorf.png',
      'description': 'happy to be here. +13 confusion',
      'artist': artists.windowkitties,
    },
    'hungrygang': {
      'name': 'Hungry Gang',
      'image': 'images/cards/hunger.png',
      'description': 'you gonna finish that? +30 hunger +30 tasty',
      'artist': artists.instantonion,
    },
    'angry': {
      'name': 'Angry BBC Frog',
      'image': 'images/cards/anger.png',
      'description': 'watch out, Attenborough. +10 cute +10 rage +7 squeak',
      'artist': artists.julia,
    },
    'pretzel': {
      'name': 'Pretzel Frog',
      'image': 'images/cards/pretzel.png',
      'description': 'salty or sweet depending on your preference. +55 carbs',
      'artist': artists.windowkitties,
    },
    'frogarons-gray': {
      'name': 'Frogarons',
      'image': 'images/cards/frogarons-gray.png',
      'description': 'crispy, chewy, melty. #OrIsIt? +50 happiness',
      'artist': artists.iyfrr,
    },
    'frogarons-green': {
      'name': 'Frogarons',
      'image': 'images/cards/frogarons-green.png',
      'description': 'crispy, chewy, melty. #OrIsIt? +50 happiness',
      'artist': artists.iyfrr,
    },
    'betterdays': {
      'name': 'Better Days',
      'image': 'images/cards/betterdays.png',
      'description': 'reminiscing the old days. +100 nostalgia',
      'artist': artists.slide,
    },
    'froxodiala': {
      'name': 'Left Arm of Frogxodia',
      'image': 'images/cards/frogxodia_la.png',
      'description': 'a frogbidden left arm sealed by magic. +1 arm',
      'artist': artists.frogapples,
    },
    'froxodiall': {
      'name': 'Left Leg of Frogxodia',
      'image': 'images/cards/frogxodia_ll.png',
      'description': 'a frogbidden left leg sealed by magic. +1 leg',
      'artist': artists.frogapples,
    },
    'froxodiara': {
      'name': 'Right Arm of Frogxodia',
      'image': 'images/cards/frogxodia_ra.png',
      'description': 'a frogbidden right arm sealed by magic. +1 arm',
      'artist': artists.frogapples,
    },
    'froxodiarl': {
      'name': 'Right Leg of Frogxodia',
      'image': 'images/cards/frogxodia_rl.png',
      'description': 'a frogbidden right leg sealed by magic. +1 leg',
      'artist': artists.frogapples,
    },
    'frogponaddict': {
      'name': 'Frogpon Addict',
      'image': 'images/cards/frogponaddict.png',
      'description': 'he hasn\'t seen sun in days. +2 eyestrain -1 life',
      'artist': artists.funnyunfunny,
    },
    'froggyfriends': {
      'name': 'Froggy Friends',
      'image': 'images/cards/froggyfriends.png',
      'description': 'they shine in the nightsky. +10 friends',
      'artist': artists.silk,
    },
    'froggymermaid': {
      'name': 'Froggy Mermaid',
      'image': 'images/cards/froggymermaid.png',
      'description': 'la la la... +1 fish... kinda',
      'artist': artists.silk,
    },
    'snowfrog': {
      'name': 'Snow Frog',
      'image': 'images/cards/snowfrog.png',
      'description': 'do you wanna build a snowfrog? +1 come on let\'s go and play',
      'artist': artists.silk,
    },
    'tadpole': {
      'name': 'Tadpole',
      'image': 'images/cards/tadpole.png',
      'description': 'baby frog. +5 adorable -1 frogn\'t',
      'artist': artists.kingworrell,
    },
    'spacelord': {
      'name': 'Space Lord',
      'image': 'images/cards/spacelord.png',
      'description': 'chomp -1 planet',
      'artist': artists.finch,
    },
    'spacelord': {
      'name': 'Space Lord',
      'image': 'images/cards/spacelord.png',
      'description': 'chomp -1 planet',
      'artist': artists.finch,
    },
    'popfrog': {
      'name': 'Pop Frog',
      'image': 'images/cards/popfrog.png',
      'description': '... pop! +1 pop',
      'artist': artists.matt,
    },
    'popfrog': {
      'name': 'Pop Frog',
      'image': 'images/cards/popfrog.png',
      'description': '... pop! +1 pop',
      'artist': artists.matt,
    },
    'froglorettes': {
      'name': 'Froglorettes',
      'image': 'images/cards/froglorettes.png',
      'description': '3 flavors of love. +5 passion +3 cuties',
      'artist': artists.julia,
    },
    'froglight': {
      'name': 'Frog Light',
      'image': 'images/cards/froglight.png',
      'description': 'let it guide you. +5 light -10 fear',
      'artist': artists.julia
    },
    'froggymainframe': {
      'name': 'Froggy In The Mainframe',
      'image': 'images/cards/froggymainframe.png',
      'description': '(hacker voice) im in +5 metaverse',
      'artist': artists.finch
    },
    'americantattoofrog': {
      'name': 'American Tattoo Frog',
      'image': 'images/cards/americantattoofrog.png',
      'description': 'bold will hold! +10 coolness -200 money',
      'artist': artists.ilta
    },
    'snowfrogalone': {
      'name': 'Snowfrog',
      'image': 'images/cards/snowfrogalone.png',
      'description': 'a cold winter morning +1 scarf +10 snow',
      'artist': artists.matt
    }
  },

  /* -------------------------- ULTRA RARE FROG OBJECT ------------------------ */
  'rare': {
    'galaxyfrog': {
      'name': 'Galaxy Frog',
      'image': 'images/cards/galaxyfrog.png',
      'description': 'spiraling through time and space... +100 star, +50 void',
      'artist': artists.matt,
    },
    'cutefrogstack': {
      'name': 'Ultimate Frogstack',
      'image': 'images/cards/cutefrogstack.png',
      'description': 'kinda big, kinda cute. +999 domination',
      'artist': artists.elena,
    },
    'ultimatefrogstack': {
      'name': 'Ultimate Frogstack',
      'image': 'images/cards/frogstack.png',
      'description': 'no joke. +999 domination',
      'artist': artists.elena,
    },
    'dreaming': {
      'name': 'Dreaming Frog',
      'image': 'images/cards/dreaming.png',
      'description': 'he dream of the beyond. +1 aspiration',
      'artist': artists.frogapples,
    },
    'froget': {
      'name': 'Froget Me Not',
      'image': 'images/cards/frogetmenot.png',
      'description': 'always remember. +100 memories',
      'artist': artists.frogapples,
    },
    'frogchurch': {
      'name': 'Church of The Frog',
      'image': 'images/cards/frogchurch.png',
      'description': 'join now with a one time membership fee. +10% secret tithe',
      'artist': artists.finch,
    },
    'piouswindow': {
      'name': 'Pious Window',
      'image': 'images/cards/piouswindow.png',
      'description': 'the good word is ribbit. +1 ribbit +6 piety',
      'artist': artists.finch,
    },
    'divineretribution': {
      'name': 'Divine Retribution',
      'image': 'images/cards/divineretribution.png',
      'description': 'bad children get sent to frog hell. +80 punishment',
      'artist': artists.finch,
    },
    'frogbarian': {
      'name': 'Frogbarian',
      'image': 'images/cards/frogbarian.png',
      'description': 'feel the sweet, moist taste of victory. +50 moist +1 victory',
      'artist': artists.imaginarymon,
    },
    'lofifrog': {
      'name': 'Lofi Frog',
      'image': 'images/cards/lofifrog.png',
      'description': 'he study to some jams. +20 intelligence +10 relaxation +100 vibe',
      'artist': artists.instantonion,
    },
    'hidenseek': {
      'name': 'Hide n Seek',
      'image': 'images/cards/hidenseek.png',
      'description': 'ready or not. +100 sneaky +1 lilypad',
      'artist': artists.julia,
    },
    'megahop': {
      'name': 'Mega Hop',
      'image': 'images/cards/megahop.png',
      'description': 'brb ;) +7 hop +50 stars',
      'artist': artists.julia,
    },
    'rainbowkids': {
      'name': 'Rainbow Kids',
      'image': 'images/cards/rainbowkids.png',
      'description': 'secret club gathering. +6 friends +15 colorful',
      'artist': artists.julia,
    },
    'streamfrog': {
      'name': 'Stream Frog',
      'image': 'images/cards/streamfrog.png',
      'description': 'let\'s play frog souls! +100 viewers, +20 fame',
      'artist': artists.julia,
    },
    'frogglanee': {
      'name': 'Frogglanee',
      'image': 'images/cards/frogglanee.png',
      'description': 'oh-la-nee, the frogs! the frogs?',
      'artist': artists.pixel,
    },
    'astro': {
      'name': 'Astro Froggy',
      'image': 'images/cards/astro.png',
      'description': 'floating ... +100000000000000000 stars',
      'artist': artists.silk,
    },
    'submarine': {
      'name': 'Froggy Submarine',
      'image': 'images/cards/submarine.png',
      'description': 'they all live in a yellow submarine. +1 song reference',
      'artist': artists.silk,
    },
    'pond': {
      'name': 'Pond Froggy',
      'image': 'images/cards/pond.png',
      'description': 'cannot swim, hence the boat. +10 friendship',
      'artist': artists.silk,
    },
    'sword': {
      'name': 'Sword Froggy',
      'image': 'images/cards/sword.png',
      'description': 'wahh!! +10 attack.',
      'artist': artists.silk,
    },
    'elguapo': {
      'name': 'El Guapo Rana',
      'image': 'images/cards/elguapo.png',
      'description': 'too handsome. +10 strength +50 looks',
      'artist': artists.skullpixl,
    },
    'frogrock': {
      'name': 'Frog Rock',
      'image': 'images/cards/frogrock.png',
      'description': 'they say you can hear it croak. +5 moss +1 croak',
      'artist': artists.splishyplash,
    },
    'frogmagejourney': {
      'name': 'Frog Mage\'s Journey',
      'image': 'images/cards/frogmagejourney.png',
      'description': 'the seagulls only talk about chips. +900 km/h',
      'artist': artists.finch,
    },
    'hidingplace': {
      'name': 'Hiding Place',
      'image': 'images/cards/hidingplace.png',
      'description': 'it\'s like an easter egg! +1 cozy',
      'artist': artists.kiana,
    },
    'pondering': {
      'name': 'Ponder-ing',
      'image': 'images/cards/pondering.png',
      'description': 'reflect on the past. +5 self-awareness -3 joy',
      'artist': artists.jd,
    },
    'realisticfrog': {
      'name': 'Realistic Frog',
      'image': 'images/cards/realisticfrog.png',
      'description': 'why is it so detailed? +9 moist -3 slippery',
      'artist': artists.kingworrell,
    },
    'froxodia': {
      'name': 'Froxodia The Frogbidden',
      'image': 'images/cards/frogxodia_h.png',
      'description': 'if you draw all five parts in a row, you win the game. -1 seal +1 HE',
      'artist': artists.frogapples
    },
    'jellyfrogs': {
      'name': 'Jellyfrogs',
      'image': 'images/cards/jellyfrogs.png',
      'description': 'cool jellyfriends that love to jam +3 friend +3 sting',
      'artist': artists.cloudtrumpets
    },
    'ascendedfrog': {
      'name': 'Ascended Frog',
      'image': 'images/cards/ascendedfrog.png',
      'description': 'the birth of an amphibious diety +9999 enlightenment +200% neural optimization +1 divine status',
      'artist': artists.funnyunfunny
    },
    'froggycrew': {
      'name': 'Froggy Crew',
      'image': 'images/cards/froggycrew.png',
      'description': 'they\'re all friends +42 friends',
      'artist': artists.finch
    },
    'frogshade': {
      'name': 'Frog Shade',
      'image': 'images/cards/frogshade.png',
      'description': 'when you\'re too small for a tree -10 sun +2 bee friends',
      'artist': artists.lesma
    }


  }
}