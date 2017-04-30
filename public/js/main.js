jQuery(document).ready(function($){

    $("#demo02").animatedModal({
            modalTarget:'modal-02',
            animatedIn:'fadeInUpBig',
            animatedOut:'fadeOutDownBig',
            // Callbacks
            beforeOpen: function() {
                    console.log("The animation was called");
            },
            afterOpen: function() {
                    console.log("The animation is completed");
            },
            beforeClose: function() {
                    console.log("The animation was called");
            },
            afterClose: function() {
                    console.log("The animation is completed");
            }
    });
});
