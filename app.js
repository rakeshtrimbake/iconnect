const yargs = require("yargs");
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    code: {
      describe: "Country code",
    },
    passport_number: {
      describe: "Passport Number",
    },
    gloves: {
      describe: "Gloves items need to customer",
    },
    masks: {
      describe: "Mask items need to customer",
    },
  },
  handler: function (argv) {
    const countryCodeType = {
      UK: "UK",
      GERMANY: "Germany",
    };
    let ukMaskStock = 100;
    const ukMaskPrize = 65;
    let ukGlovesStock = 100;
    const ukGlovesPrize = 100;
    let germanyMaskStock = 100;
    const germanyMaskPrize = 100;
    let germanyGlovesStock = 50;
    const germanyGlovesPrize = 150;
    const shippingCharge = 400;
    let salePrize = 0;
    let glovesTotalPrize =0;
    let maskTotalPrize = 0;

    const getfirstWordOfPassword = argv.passport_number.split("");

    if (countryCodeType.UK === argv.code && getfirstWordOfPassword[0] != "B") {
        const glovesDivisionCount = Math.floor(argv.gloves / 10);
        const maskDivisionCount = Math.floor(argv.masks/10);
        const glovesReminder = argv.gloves % 10;
        const maskReminder = argv.masks % 10;
        if(glovesReminder) {
            glovesTotalPrize = glovesReminder * germanyGlovesPrize;
            
        }
        if(maskReminder) {
            maskTotalPrize =  maskReminder * germanyMaskPrize;
            germanyMaskStock -= maskReminder;
            
        }
       if(argv.gloves > ukGlovesStock) {
        glovesTotalPrize += (ukGlovesStock) * ukGlovesPrize;
        glovesTotalPrize += (argv.gloves - ukGlovesStock -glovesReminder) * germanyGlovesPrize;
        
        germanyGlovesStock -= argv.gloves - ukGlovesStock - glovesReminder;
        ukGlovesStock -= ukGlovesStock;
        console.log(argv.gloves - ukGlovesStock - glovesReminder)
        } else {
        glovesTotalPrize += (argv.gloves - glovesReminder) * germanyGlovesPrize;
        germanyGlovesStock -= (argv.gloves - glovesReminder);
       }
       console.log(germanyGlovesStock)

       if(argv.masks > ukMaskStock) {
        maskTotalPrize += (ukMaskStock) * ukMaskPrize;
        maskTotalPrize += (argv.masks - ukMaskStock - maskReminder) * germanyMaskPrize;
       } else {
        maskTotalPrize += (argv.masks - maskReminder) * germanyMaskPrize;
       }
      
      
      const shippingCost = ((ukGlovesStock - argv.gloves) + (ukMaskStock - argv.masks)) * 320;
      console.log(shippingCost+" gloves prize "+glovesTotalPrize+" mask prize "+maskTotalPrize) 
       salePrize = glovesTotalPrize + maskTotalPrize + shippingCost;
      
    } else if(countryCodeType.UK === argv.code){
        const glovesPrize = argv.gloves * ukGlovesPrize;
         const maskPrize = argv.masks * ukMaskPrize;
          salePrize = glovesPrize + maskPrize;
          ukMaskStock -= argv.masks;
          ukGlovesStock -= argv.gloves;
    }
    

    if (
      countryCodeType.GERMANY === argv.code &&
      getfirstWordOfPassword[0] == "B"
    ) {
        const glovesDivisionCount = Math.floor(argv.gloves / 10);
        const maskDivisionCount = Math.floor(argv.masks/10);
        const glovesReminder = argv.gloves % 10;
        const maskReminder = argv.masks % 10;
        if(glovesReminder) {
            glovesTotalPrize = glovesReminder * ukGlovesPrize;
        }
        if(maskReminder) {
            maskTotalPrize =  maskReminder * ukMaskPrize;
        }
       if(argv.gloves > germanyGlovesStock) {
        glovesTotalPrize += (germanyGlovesStock - glovesReminder) * germanyGlovesPrize;
        glovesTotalPrize += (argv.gloves - germanyGlovesStock) * ukGlovesPrize;
        } else {
        glovesTotalPrize += (argv.gloves - glovesReminder) * ukGlovesPrize;
       }

       if(argv.masks > germanyMaskStock) {
        maskTotalPrize += (germanyMaskStock - maskReminder) * germanyMaskPrize;
        maskTotalPrize += (argv.masks - germanyMaskStock) * ukMaskPrize;
       } else {
        maskTotalPrize += (argv.masks - maskReminder) * ukMaskPrize;
       }
      
      const shippingCost = ((ukGlovesStock - argv.gloves) + (ukMaskStock - argv.masks)) * 320;
      console.log(shippingCost+" gloves prize "+glovesTotalPrize+" mask prize "+maskTotalPrize) 
       salePrize = glovesTotalPrize + maskTotalPrize + shippingCost;
      germanyMaskStock -= argv.masks;
      germanyGlovesStock -= argv.gloves;
    } else if(countryCodeType.GERMANY === argv.code){
        const glovesPrize = argv.gloves * germanyGlovesPrize;
        const maskPrize = argv.masks * germanyMaskPrize;
          salePrize = glovesPrize + maskPrize;
          ukMaskStock -= argv.masks;
          ukGlovesStock -= argv.gloves;
    }
    console.log(
      salePrize +
        ":" +
        ukMaskStock +
        ":" +
        germanyMaskStock +
        " " +
        ukGlovesStock +
        ":" +
        germanyGlovesStock
    );
  },
});

yargs.parse();
