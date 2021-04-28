//
//  ComponentsListView.swift
//  StyleDictionaryDarkModeDemo
//
//  Created by Banks, Daniel on 3/10/21.
//  Copyright © 2021 Amazon. All rights reserved.
//

import Foundation
import SwiftUI

struct ComponentsListView: View {
    var body: some View {
        NavigationView {
            List() {
                NavigationLink(destination: ButtonsView()) {
                    Text("Buttons")
                }.listRowBackground(Color.backgroundPrimary)
                NavigationLink(destination: BadgesView()) {
                    Text("Badges")
                }.listRowBackground(Color.backgroundPrimary)
            }.navigationBarTitle("Components")
        }.navigationViewStyle(StackNavigationViewStyle())
        .background(Color.backgroundPrimary)
    }
}
