import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";


export const configureAxiosMiddleware = function (settings) {

    const axiosClient = axios.create({ //all axios can be used, shown in axios documentation
        baseURL: settings && settings.endpoint ? settings.endpoint : 'https://example.com',
        responseType: 'json',
        timeout: 10000,
    });

// axios configuration and interceptors
    const axiosMiddlewareOptions = {
        // not required, but use-full configuration option
        // returnRejectedPromiseOnError: true,
        interceptors: {
            request: [
                ({getState, dispatch}, request) => {
                    // any transforms on the request
                    return request
                }
            ],
            response: [{
                success: function ({getState, dispatch, getSourceAction}, req) {
                    //contains information about request object
                    if (__DEV__) {
                        console.log("axios response: ", req);
                    }
                    return req;
                },
                error: function ({getState, dispatch, getSourceAction}, error) {
                    if (__DEV__) {
                        console.log('axios error', error);
                    }
                    return Promise.reject(error);
                }

            }
            ]
        }
    };


    return axiosMiddleware(axiosClient, axiosMiddlewareOptions)
};