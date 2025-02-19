package com.ase.project.nutri_fit_app.exception;

public class DatabaseConnectionException extends RuntimeException{

    public DatabaseConnectionException(String message) {
        super(message);
    }

    public DatabaseConnectionException(String message, Throwable cause){
        super(message, cause);
    }


}
