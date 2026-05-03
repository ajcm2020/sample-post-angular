import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from '../toolbar/toolbar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-public-shell',
  imports: [RouterOutlet, Toolbar, Footer],
  templateUrl: './public-shell.html',
  styleUrl: './public-shell.css',
})
export class PublicShell {}
