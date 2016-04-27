/**
 * Created by mengxichen on 4/8/16.
 */
var q = require("q");

module.exports = function(mongoose, db) {
    var ReviewSchema = require("./../schema/review.schema.server.js")(mongoose);

    var ReviewModel = mongoose.model('Review', ReviewSchema);

    var api = {
        createReview:createReview,
        deleteReviewById:deleteReviewById,
        getAllReviewsByUsername:getAllReviewsByUsername,
        getAllReviewsByVendorUsername:getAllReviewsByVendorUsername,
        getAllReviewsByAdmin:getAllReviewsByAdmin

    };

    return api;

    function createReview(review){
        var review = new ReviewModel({
            vendorUsername: review.vendorUsername,
            username: review.username,
            time: new Date(),
            rating: review.rating,
            comment:review.comment
        });

        var deferred = q.defer();
        review.save(function (err,doc){
            if(err){
                deferred.reject(err)
            }else{
                deferred.resolve(doc);
            }

        });
        return deferred.promise;
    }



    function deleteReviewById(reviewId){
        var deferred = q.defer();
        reviewId = mongoose.Types.ObjectId(reviewId);
        ReviewModel.remove({_id:reviewId},
            function(err,result){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(result);
                }
            });


        return deferred.promise;
    }



    function getAllReviewsByUsername(username){
        var deferred = q.defer();
        ReviewModel.find({username:username},
            function(err,doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;

    }



    function getAllReviewsByVendorUsername(vendorUsername){
        var deferred = q.defer();
        ReviewModel.find({vendorUsername:vendorUsername},
            function(err,doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;


    }



    function getAllReviewsByAdmin(){
        var deferred = q.defer();
        ReviewModel.find(function(err,doc){
            console.log(doc);
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

}