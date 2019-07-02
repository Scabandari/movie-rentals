"use strict";
// import chai from 'chai';
// import chaiHttp from 'chai-http';
const app = require('../index');
// import { describe } from "mocha";
const chai = require('chai');
const chaiHttp = require('chai-http');
const mocha = require('mocha');
const { describe } = mocha;
const util = require('./util');
const Customer = require('../models/customer');

const expect = chai.expect;

const customer_properties = [
    'first_name',
    'last_name',
    'phone',
    'email',
    'start_date',
    'balance',
    'account_active'
];

//let customer_id = '';
let temp_cust = {};


// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Testing customers Routes/Controller", () => {
    describe("GET /*", () => {
        it("should get all customer instance", (done) => {
            chai.request(app)
                .get('/customers')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array').lengthOf.greaterThan(0);
                    done();
                });
        });
        it("should get a single customer instance", (done) => {
            const id = '5d1792f46c6634681776fda9';
            chai.request(app)
                .get(`/customers/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    customer_properties.forEach(prop => {
                        //expect(res.body).haveOwnProperty(prop);
                        expect(res.body).have.property(prop);
                    });
                    done();
                });
        });

        it("should not get a single customer instance", (done) => {
            const id = '5d1792f46c6634681776fda5';  // incorrect _id
            chai.request(app)
                .get(`/customers/${id}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it("should not get a single customer instance", (done) => {
            const id = '5';  // won't be cast as an _id at all
            chai.request(app)
                .get(`/customers/${id}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe("POST", () => {
        it("should create a single customer instance", (done) => {
            const
                first_name = "Paul",
                last_name = "Manaford",
                phone = '532 333 5566',
                email = "paul.manna5@email.com";

            chai.request(app)
                .post(`/customers/create?first_name=${first_name}&last_name=${last_name}&phone=${phone}&email=${email}`)
                .end((err, res) => {
                    //console.log(`res.status: ${res.status}`);
                    res.should.have.status(200);
                    customer_properties.forEach(prop => {
                        expect(res.body).haveOwnProperty(prop);
                        //expect(res.body).have.property(prop);
                    });
                    temp_cust.id = res.body._id;
                    // const customer = Customer.findById(temp_cust.id);
                    // expect(customer).equals(false);
                    done();
                });
        });

        it("should not create a single customer instance", (done) => {
            // body required for POST is missing
            chai.request(app)
                .post('/customers/create')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe("PUT", () => {
        it("should update an instance of Customer and replace and provided attributes", (done) => {
            const
                first_name = "Old",
                last_name = "Ben",
                phone = '111 111-1111',
                email = "old@ben.com",
                balance = 2,
                account_active = true;

            chai.request(app)
                .put(`/customers/${temp_cust.id}/update?first_name=${first_name}` +
                    `&last_name=${last_name}&email=${email}&phone=${phone}` +
                    `&balance=${balance}&account_active=${account_active}`)
                .end((err, res) => {
                   const { body } = res;
                   res.should.have.status(200);
                   expect(body.first_name).to.equal(first_name);
                   expect(body.last_name).to.equal(last_name);
                   expect(body.phone).to.equal(phone);
                   expect(body.email).to.equal(email);
                   expect(body.balance).to.equal(balance);
                   expect(body.account_active).to.equal(account_active);
                   expect(body).to.have.property('start_date');
                   temp_cust.balance = res.body.balance;
                   done();
                });
        });
    });

    describe("PATCH", () => {
        it("It should increase the customer's balance by the given amount", (done) => {
            const amount = 2;
            chai.request(app)
                .patch(`/customers/${temp_cust.id}/patch?amount=${amount}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body.balance).to.equal(temp_cust.balance + amount);
                    done();
                });
        });

        it("It should not increase the customer's balance given a letter instead of a number", (done) => {
            const amount = 'A';
            chai.request(app)
                .patch(`/customers/${temp_cust.id}/patch?amount=${amount}`)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });



    describe("DELETE", () => {
        it("should delete an instance of Customer given a correct _id", (done) => {
            chai.request(app)
                .delete(`/customers/${temp_cust.id}/delete`)
                .end((err, res) => {
                    res.should.have.status(200);
                    // TODO find a way to verify the non existence. Below doesn't work
                    // const customer = Customer.findById(temp_cust.id);
                    // expect(customer).equals(null);
                    done();
                });
        });

        it("should not delete an instance of Customer given an incorrect _id", (done) => {
            const id = '5d18ee6d83fb7611a2gggggg';
            chai.request(app)
                .delete(`/customers/${id}/delete`)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

});
