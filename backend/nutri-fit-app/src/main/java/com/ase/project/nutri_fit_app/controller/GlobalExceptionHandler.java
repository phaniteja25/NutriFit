package com.ase.project.nutri_fit_app.controller;


import com.ase.project.nutri_fit_app.exception.DatabaseConnectionException;
import com.ase.project.nutri_fit_app.model.ErrorResponse;
import jakarta.persistence.PersistenceException;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.postgresql.util.PSQLException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/*
*  This controller is used to handle the database related errors and tries to handle it
* */
@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);


    //to handle JpaSytemException


    //all the JPA related errors come to this method
    @ExceptionHandler(DatabaseConnectionException.class)
    public ResponseEntity<ErrorResponse> handleDBException(DatabaseConnectionException ex){
        if(ex.getCause() instanceof PersistenceException){
            Throwable rootCause = ExceptionUtils.getRootCause(ex);

            //checks if the error is related to Max connections error
            if(rootCause instanceof PSQLException && "53300".equals(((PSQLException) rootCause).getSQLState())){
                logger.error("Maximum database connections reached",ex);
                return handleMaxConnectionsError((PSQLException) rootCause);

            }
        }

        // if not calls this method
        return handleGenericDatabaseError(ex);


    }

    private ResponseEntity<ErrorResponse> handleMaxConnectionsError(PSQLException ex) {
        ErrorResponse error = new ErrorResponse(
                "Database connection limit reached",
                "The service is experiencing high load. Please try again later.",
                HttpStatus.SERVICE_UNAVAILABLE.value()
        );
        return new ResponseEntity<>(error, HttpStatus.SERVICE_UNAVAILABLE);
    }



    private ResponseEntity<ErrorResponse> handleGenericDatabaseError(Exception ex) {
        ErrorResponse error = new ErrorResponse(
                "Database error",
                "An unexpected database error occurred",
                HttpStatus.INTERNAL_SERVER_ERROR.value()
        );
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }







}
