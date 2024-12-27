import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, switchMap, throwError } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private authService : AuthService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const accessToken = this.authService.accessToken

        // Aggiungiamo l'header Authorization solo se abbiamo un token
        const authRequest = accessToken ? request.clone({
            setHeaders : {Authorization : `Bearer ${accessToken}`}
        }) : request
        
        // Passiamo la richiesta clonata al prossimo handler
        return next.handle(authRequest).pipe(
            catchError((error : HttpErrorResponse) => {
                if(error.status === 401 || error.status === 403){
                    return this.handle401Error(request, next)
                }
                return throwError(() => error)
            })
        )
    }

    private handle401Error(request : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>>{

        return this.authService.refreshAccessToken(this.authService.refreshToken).pipe(
            switchMap((newAccessToken : string) => {
                this.authService.accessToken = newAccessToken

                const newAuthRequest = request.clone({setHeaders : {Authorization : `Bearer ${newAccessToken}`}})

                return next.handle(newAuthRequest)
            }),
            catchError(refreshError => {
                this.authService.logout()
                return throwError(() => refreshError)
            })
        )
    }
    
}