//
//  ContentView.swift
//  StyleDictionaryDarkModeDemo
//
//  Created by Banks, Daniel on 3/10/21.
//  Copyright © 2021 Amazon. All rights reserved.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        TabView {
            HomeView().tabItem {
                Image(systemName: "paperplane")
                Text("Home")
            }
            TokensView().tabItem {
                Image(systemName: "paintbrush.pointed")
                Text("Tokens")
            }
            ComponentsListView().tabItem {
                Image(systemName: "wallet.pass")
                Text("Components")
            }
        }.accentColor(Color.brandPrimary)
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
