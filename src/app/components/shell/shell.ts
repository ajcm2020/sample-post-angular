import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from '../toolbar/toolbar';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, Toolbar, Sidebar, Footer],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
})
export class Shell {}
