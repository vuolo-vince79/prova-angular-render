import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, concatMap, Observable, repeat, switchMap, throwError } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private authService : AuthService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // if(request.url.includes("/api/auth/register")){
        //     return next.handle(request)
        // }

        const accessToken = this.authService.accessToken
        console.log("primo token", accessToken)
        // Aggiungiamo l'header Authorization solo se abbiamo un token
        const authRequest = accessToken ? request.clone({
            setHeaders : {Authorization : `Bearer ${accessToken}`}
        }) : request
        
        // Passiamo la richiesta clonata al prossimo handler
        return next.handle(authRequest).pipe(
            catchError((error : HttpErrorResponse) => {
                if(error.status === 401 || error.status === 403){
                    console.log("errore intercettato", error.status)
                    return this.handle401Error(authRequest, next)
                }
                return throwError(() => error)
            })
        )
    }

    private handle401Error(request : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>>{
        console.log("ingresso nel metodo handle401Error")
        return this.authService.refreshAccessToken(this.authService.refreshToken).pipe(
            switchMap((newAccessToken : string) => {
                this.authService.accessToken = newAccessToken
                console.log("new accessToken", newAccessToken)
                const newAuthRequest = request.clone({setHeaders : {Authorization : `Bearer ${newAccessToken}`}})
                console.log("invio nuova richiesta", newAuthRequest)
                return next.handle(newAuthRequest)
            }),
            catchError(refreshError => {
                console.log("errore token, qua dovrebbe rimandare al login")
                this.authService.logout()
                return throwError(() => refreshError)
            })
        )
    }
    
}